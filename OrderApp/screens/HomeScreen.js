import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native'

import { listMenu, getMenuListById, listOrder } from '../contents'
import { MenuItem, OrderTmpItem, MealItem } from '../screens'
import { colors, images, sizes, icons } from '../config'
import Icon from 'react-native-vector-icons/FontAwesome5'

import { ModalDialog } from '../components'

const HomeScreen = (props) => {

    //<---------initLoad------START----->
    //1. Get menu list (API: GetMenuList)
    const [getListMenu, setListMenu] = useState(listMenu.length > 0 ? listMenu : [])
    //2. Set selected first menu
    const [selectedMenuIndex, setSelectedMenuIndex] = useState(listMenu.length > 0 ? 0 : -1)
    //3. Get selected menu id,menu nm
    const [selectMenuId, setSelectMenuId] = useState(listMenu.length > 0 ? listMenu[0].menu_id : null)
    const [selectMenuNm, setSelectMenuNm] = useState(listMenu.length > 0 ? listMenu[0].menu_nm : null)
    //4. Get meal list by menu id
    const [listMealByMenuId, setListMealByMenuId] = useState(selectMenuId != null ?
        getMenuListById(selectMenuId).length > 0 ?
            getMenuListById(selectMenuId) : [] :
        [])
    //5. List order temp
    const [listOrderTmp, setListOrderTmp] = useState([])
    //6. Flag refresh list order temp
    const [isFetchingOrderLstTmp, setFetchingOrderLstTmp] = useState(false)
    //7. Create dialog check ORDER NOW
    const [digOrderNow, setDigOrderNow] = useState(false)
    //8. Create dialog check RESET
    const [digReset, setDigReset] = useState(false)
    //9. Warning dialog 
    const [digWarn, setDigWarn] = useState(false)

    //Move between screens
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    //<---------initLoad-------END------>

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            //after goback
            setFetchingOrderLstTmp(false)
        });
        //initload

        return unsubscribe;
    }, [navigation])

    useEffect(() => {
        setFetchingOrderLstTmp(false)
    }, [isFetchingOrderLstTmp])


    function setOrderTmpByAmount(data) {
        setFetchingOrderLstTmp(true)
        const found = listOrderTmp.some(element => element.meal_id == data.data.meal_id)
        if (!found) {
            listOrderTmp.push(data.data)
        }
        else {
            //Find index of specific object using findIndex method.    
            let objIndex = listOrderTmp.findIndex(obj => obj.meal_id == data.data.meal_id)

            //Update object's name property.
            listOrderTmp[objIndex].meal_count = data.data.meal_count
        }
        setListOrderTmp(listOrderTmp)
    }

    function handleMinusMeal(index) {
        setFetchingOrderLstTmp(true)
        listOrderTmp[index].meal_count = listOrderTmp[index].meal_count > 1 ?
            listOrderTmp[index].meal_count - 1 : 1
        setListOrderTmp(listOrderTmp)
    }

    function handlePlusMeal(index) {
        setFetchingOrderLstTmp(true)
        listOrderTmp[index].meal_count = listOrderTmp[index].meal_count + 1
        setListOrderTmp(listOrderTmp)
    }

    function handleDeleteMeal(index) {
        setFetchingOrderLstTmp(true)
        listOrderTmp.splice(index, 1)
        setListOrderTmp(listOrderTmp)
    }

    function handleResetOrderTmp() {
        setFetchingOrderLstTmp(true)
        setListOrderTmp([])
    }

    function handleOrderTmp() {
        setFetchingOrderLstTmp(true)
        listOrderTmp.map((item) => {
            item.meal_order_stt = true
            return item
        })
        setListOrderTmp(listOrderTmp)
    }

    return <View style={{
        flex: 1,
    }}>
        {/* Header: 10 */}
        <View style={styles.header}>
            <View style={styles.logo_view}>
                <Image
                    source={images.logo}
                    resizeMode='stretch'
                    style={styles.image_sz} />
            </View>
        </View>

        {/* Detail */}
        <View style={{ flex: 80, flexDirection: 'row' }}>
            {/* List meal */}
            <View style={{ flex: 70, borderRightWidth: 1 }}>
                {/* List menu */}
                <View style={{ flex: 25 }}>
                    <FlatList
                        data={getListMenu}
                        horizontal={true}
                        renderItem={({ item, index }) =>
                            <MenuItem menu={item}
                                key={item.menu_id}
                                index={index}
                                selected={selectedMenuIndex}
                                onPress={() => {
                                    setSelectedMenuIndex(index)
                                    setListMealByMenuId(getMenuListById(item.menu_id).length > 0 ?
                                        getMenuListById(item.menu_id) : [])
                                    setSelectMenuId(item.menu_id)
                                    setSelectMenuNm(item.menu_nm)
                                }}
                            />
                        }
                        keyExtractor={item => item.menu_id}
                    />
                </View>
                {/* List meal detail */}
                <View style={{ flex: 75 }}>
                    {/* List meal */}
                    <View style={{ flex: 1, paddingTop: 5, paddingLeft: 5 }}>
                        <FlatList
                            data={listMealByMenuId}
                            numColumns={2}
                            renderItem={({ item, index }) =>
                                <MealItem
                                    meal={item}
                                    key={item.meal_id}
                                    index={index}
                                    // selected={selectedMenuIndex}
                                    onPress={() => {
                                        navigate('MealScreen', {
                                            menu_id: selectMenuId,
                                            menu_nm: selectMenuNm,
                                            meal_id: item.meal_id,
                                            setOrderTmpByAmount: setOrderTmpByAmount
                                        })
                                    }}
                                />
                            }
                            keyExtractor={item => item.meal_id}
                        />
                    </View>
                </View>
            </View>

            {/* Order */}
            <View style={{ flex: 30, flexDirection: 'row' }}>
                {/* Order info */}
                <View style={{ flex: 20 }}>
                    {/* Table info */}
                    <View style={styles.table_view}>
                        <ImageBackground
                            style={{ flex: 1 }}
                            source={images.table_bg}
                            resizeMode='repeat'
                            >
                            <View style={styles.table_item}>
                                <Text style={styles.table_content}>
                                    TABLE NO:
                                </Text>
                                <TouchableOpacity
                                    onLongPress={() => {
                                        alert('adsd')
                                    }}
                                    style={styles.table_btn}>
                                    <Text style={styles.table_no}>1</Text>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>

                    </View>
                    {/* List order */}
                    <View style={{ flex: 80, backgroundColor: 'white' }}>
                        <View style={{ flex: 1, margin: 10 }}>
                            <Text style={{ color: colors.color_tx,fontSize:sizes.font_sz_title,fontWeight:'bold' }}>
                                ORDER LIST
                            </Text>
                            <FlatList
                                data={listOrderTmp}
                                renderItem={({ item, index }) =>
                                    <OrderTmpItem order={item}
                                        key={index}
                                        index={index}
                                        onPressDown={() => {
                                            handleMinusMeal(index)
                                        }}
                                        onPressUp={() => {
                                            handlePlusMeal(index)
                                        }}
                                        onPressDel={() => {
                                            handleDeleteMeal(index)
                                        }}
                                    />}
                                keyExtractor={item => item.meal_id}
                                onRefresh={setOrderTmpByAmount}
                                refreshing={isFetchingOrderLstTmp}
                                progressViewOffset={100}
                            />
                        </View>
                    </View>
                    {/* button */}
                    <View style={{ flex: 10, flexDirection: 'row' }}>
                        <View style={styles.btn_view}>
                            <TouchableOpacity style={styles.btnOrder}
                                onPress={() => {
                                    listOrderTmp.length > 0 ?
                                        setDigOrderNow(true) :
                                        setDigWarn(true)
                                }}>
                                <Text style={{ color: 'white' }}>ORDER NOW</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.btn_view}>
                            <TouchableOpacity style={styles.btnReset}
                                onPress={() => {
                                    if (listOrderTmp.length > 0) {
                                        setDigReset(true)
                                    }
                                }}>
                                <Text style={{ color: 'white' }}>RESET</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>


        {/* Footer */}
        <View style={{ flex: 10, borderTopWidth: 1, flexDirection: 'row' }}>
            <View style={{ flex: 25 }}></View>
            <TouchableOpacity style={{
                flex: 25,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Icon name={icons.ic_call_waiter} size={sizes.size_icon_footer} color={'orangered'}></Icon>
                <Text style={{
                    color: colors.color_tx,
                    marginLeft: 10,
                    fontSize: sizes.font_sz_footer
                }}>Call waiter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                flex: 25,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}
                onPress={() => {
                    navigate('ReceiptScreen', {
                        listOrder: listOrderTmp
                    })
                }}
            >
                <Icon name={icons.ic_checkout} size={sizes.size_icon_footer} color={'green'}></Icon>
                <Text style={{
                    color: colors.color_tx,
                    marginLeft: 10,
                    fontSize: sizes.font_sz_footer
                }}>Check out</Text>
            </TouchableOpacity>
            <View style={{ flex: 25 }}></View>
        </View>
        <ModalDialog
            visible={digOrderNow}
            children={{
                title: 'Xác nhận!',
                message: 'Bạn chắc chắn đặt món ?',
                type: 'yes/no'
            }}
            onYes={() => {
                setDigOrderNow(false)
                handleOrderTmp()
            }}
            onNo={() => {
                setDigOrderNow(false)
            }}>
        </ModalDialog>
        <ModalDialog
            visible={digReset}
            children={{
                title: 'Xác nhận!',
                message: 'Xóa tất cả các món ?',
                type: 'yes/no'
            }}
            onYes={() => {
                setDigReset(false)
                handleResetOrderTmp()
            }}
            onNo={() => {
                setDigReset(false)
            }}>
        </ModalDialog>
        <ModalDialog
            visible={digWarn}
            children={{
                title: 'Thông báo!',
                message: 'Xin mời chọn món!',
                type: 'yes'
            }}
            onYes={() => {
                setDigWarn(false)
            }}
            onNo={() => {
                setDigWarn(false)
            }}>
        </ModalDialog>
    </View>
}
const styles = StyleSheet.create({
    header: {
        flex: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1
    },
    logo_view: {
        flex: 1,
        height: '100%',
        width: 300
    },
    image_sz: {
        height: '100%',
        width: '100%'
    },
    meal_nm: {
        padding: 10,
        marginLeft: 10,
        color: colors.color_tx,
        fontSize: 20
    },
    meal_price: {
        padding: 10,
        color: colors.color_imp,
        fontSize: 15,
        marginRight: 10,
        marginTop: 10
    },
    line: {
        backgroundColor: 'black',
        height: 1,
        width: '90%',
        marginTop: -10,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    desc_tx: {
        marginLeft: 20,
        marginTop: 10,
        marginRight: 20,
        marginBottom: 10,
        flex: 1
    },
    add_order: {
        flex: 15,
        flexDirection: 'row',
        borderTopWidth: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    amount: {
        height: 30,
        width: 30,
        borderWidth: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: 10,
        color: colors.color_tx
    },
    table_view: {
        flex: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
    },
    table_item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    table_content: {
        color: 'black',
        marginRight: 10,
        marginLeft: 10,
        fontWeight:'bold',
        fontSize:sizes.font_sz_title
    },
    table_btn: {
        height: 30,
        width: 80,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'brown'
    },
    table_no: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    btn_view: {
        flex: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnOrder: {
        padding: 10,
        backgroundColor: 'orangered',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    btnReset: {
        padding: 10,
        backgroundColor: 'orange',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
})


export default HomeScreen