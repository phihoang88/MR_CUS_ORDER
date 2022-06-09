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

import { MenuItem, OrderTmpItem, MealItem } from '../screens'
import { colors, images, sizes, icons, apis, system } from '../config'
import Icon from 'react-native-vector-icons/FontAwesome5'

import { ModalDialog, ModalDialogTable,Toast } from '../components'
import axios from 'axios'

const HomeScreen = (props) => {
    //<---------initLoad------START----->
    //1. Get menu list (API: GetMenuList)
    const [listMenu, setListMenu] = useState([])
    //2. Set init all product list
    const [listAllProduct, setListAllProduct] = useState([])
    //3. Set selected first menu
    const [selectedMenuIndex, setSelectedMenuIndex] = useState(null)
    //4. Get selected menu id,menu nm
    const [selectMenuId, setSelectMenuId] = useState(null)
    const [selectMenuNm, setSelectMenuNm] = useState('')
    //5. Get meal list by menu id
    const [listMealByMenuId, setListMealByMenuId] = useState([])

    //6. Set init table id
    const [tableId, setTableId] = useState(null)
    const [tableNm, setTableNm] = useState('')
    //7. Set init table info id
    const [tableInfoId, setTableInfoId] = useState(null)

    //8. Set first time order
    const [isFirstTimeOrder, setFirstTimeOrder] = useState(false)
    //9. Set init list Table
    const [listTable, setListTable] = useState([])



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
    //10. Table selected dialog
    const [digTableList, setDigTableList] = useState(false)

    //Move between screens
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    //<---------initLoad-------END------>

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            //after goback
            setFetchingOrderLstTmp(false)


            callGetListMenu()
            callGetAllMealList()
        });

        //initload
        callGetListMenu()
        callGetAllMealList()
        return unsubscribe;
    }, [navigation])

    //run when menu change
    useEffect(() => {
        if (selectMenuId != '') {
            if (listAllProduct != []) {
                setListMealByMenuId(listAllProduct.filter(item => item.menu_id === selectMenuId))
            }
        }
    }, [selectMenuId, listAllProduct])

    useEffect(() => {
        setFetchingOrderLstTmp(false)
    }, [isFetchingOrderLstTmp])

    //after order for the first time 
    useEffect(() => {
        if (isFirstTimeOrder) {
            //post orders 
            callPostInsertOrders()
            setFirstTimeOrder(false)
        }
    }, [isFirstTimeOrder])

    function setOrderTmpByAmount(data) {
        setFetchingOrderLstTmp(true)
        const found = listOrderTmp.some(element => element.product_id == data.data.product_id && element.product_order_stt_id == null)
        if (!found) {
            listOrderTmp.push(data.data)
        }
        else {
            //Find index of specific object using findIndex method.    
            let objIndex = listOrderTmp.findIndex(obj => obj.product_id == data.data.product_id)

            //Update object's name property.
            listOrderTmp[objIndex].count = data.data.count
        }
        setListOrderTmp(listOrderTmp)
    }

    function handleMinusMeal(index) {
        setFetchingOrderLstTmp(true)
        listOrderTmp[index].count = listOrderTmp[index].count > 1 ?
            listOrderTmp[index].count - 1 : 1
        setListOrderTmp(listOrderTmp)
    }

    function handlePlusMeal(index) {
        setFetchingOrderLstTmp(true)
        listOrderTmp[index].count = listOrderTmp[index].count + 1
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
        setTableInfoId(null)
    }

    function handleOrderTmp() {
        try {
            if (tableInfoId == null) {
                callPostInsertTableInfo()
            }
            else {
                callPostInsertOrders()
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    //<-------------------------API-----------------------START>
    //get List Menu
    const callGetListMenu = async () => {
        try {
            const res = await axios.get(`${apis.MENU_PATH}/getList`)
            if (res.data.status == 'success') {
                setListMenu(res.data.data)
                setSelectedMenuIndex(0)
                setSelectMenuId(res.data.data[0].menu_id)
            }
            else {
                setListMenu([])
                setSelectedMenuIndex(-1)
                setSelectMenuId('')
            }
        } catch (error) {
            console.log(`callGetListMenu ${error.message}`)
        }
    }

    //get All Product List 
    const callGetAllMealList = async () => {
        try {
            const res = await axios.get(`${apis.PRODUCT_PATH}/getList`)
            if (res.data.status == 'success') {
                setListAllProduct(res.data.data)
            }
            else {
                setListAllProduct([])
            }
        } catch (error) {
            console.log(`callGetAllMealList ${error.message}`)
        }
    }

    //callPost insert order list to DB
    const callPostInsertTableInfo = async () => {
        try {
            const res = await axios.post(`${apis.TABLE_INFO_PATH}/insertOrUpdateBook`, {
                "tableId": tableId,
                "tableSttId": "4",//Ordering
                "serveDate": system.systemDateString(),
                "serveTime": system.systemTimeString(),
                "isEnd": "0",
                "crtDt": system.systemDateTimeString(),
                "crtUserId": "huy",
                "crtPgmId": "order",
                "delFg": "0"
            })
            if (res.data.status == 'success') {
                setTableInfoId(res.data.data.id)
                setFirstTimeOrder(true)
                //Toast('success')
            }
            else {
                //Toast('failed')
            }
        } catch (error) {
            console.log(`callPostInsertTableInfo ${error}`)
        }
    }

    //callPost insert order list to DB
    const callPostInsertOrders = async () => {
        try {
            let orderList = listOrderTmp.filter(item => item.product_order_stt_id == null)
                .map(item => ({
                    "tableInfoId": tableInfoId,
                    "productId": item.product_id,
                    "count": item.count,
                    "productOrderSttId": "0",
                    "orderDt": system.systemDateString(),
                    "orderTm": system.systemTimeString(),
                    "crtDt": system.systemDateTimeString(),
                    "crtUserId": "huy",
                    "crtPgmId": "table order",
                    "delFg": "0"
                }))
            if (orderList.length == 0) {
                setNotiOrder(true)
            }
            else {
                const res = await axios.post(`${apis.TABLE_ORDER_PATH}/insert`, orderList)
                if (res.data.status == 'success') {
                    //callGetAllMealOrderList(tableInfoId)
                    alert('success')
                    //Toast(contents.msg_success_send_order)
                    setFetchingOrderLstTmp(true)
                    listOrderTmp.map((item) => {
                        item.product_order_stt_id = 0
                        return item
                    })
                    setListOrderTmp(listOrderTmp)
                }
                else {
                    alert('faild')
                    //Toast(contents.msg_err_send_order)
                }
            }
        } catch (error) {
            console.log(`callPostInsertOrders ${error.message}`)
        }
    }

    const callGetTableList = async () => {
        try {
            const res = await axios.get(`${apis.TABLE_INFO_PATH}/getList`)
            if (res.data.status == 'success') {
                setListTable(res.data.data.filter(item => item.table_stt_nm == 'Emptying'))
            }
            else {
                setListTable([])
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }

    // call waiter api
    const callPutMakeCalling = async () => {
        try {
            const res = await axios.put(`${apis.TABLE_INFO_PATH}/makeCalling/${tableInfoId}`)
            if (res.data.status == 'success') {
                Toast('Waiter is calling...')
            }
            else {
                Toast('Error happen! Please try again!')
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }

    //<-------------------------API-----------------------END>

    return <View style={{
        flex: 1,
    }}>
        {/* Header: 10 */}
        <View style={styles.header}>
            <View style={styles.logo_view}>
                <Image
                    source={{
                        uri: images.logo
                    }}
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
                        data={listMenu}
                        horizontal={true}
                        renderItem={({ item, index }) =>
                            <MenuItem menu={item}
                                key={item.menu_id}
                                index={index}
                                selected={selectedMenuIndex}
                                onPress={() => {
                                    setSelectedMenuIndex(index)
                                    setSelectMenuId(item.menu_id)
                                    setSelectMenuNm(item.menu_nm_vn || item.menu_nm_en || item.menu_nm_jp)
                                }}
                            />
                        }
                        keyExtractor={item => item.menu_id}
                    />
                </View>
                {/* List meal detail */}
                <View style={{ flex: 75 }}>
                    {/* List meal */}
                    <View style={{ flex: 1, paddingTop: 5, paddingLeft: 5, paddingRight: 5 }}>
                        <FlatList
                            data={listMealByMenuId}
                            numColumns={2}
                            renderItem={({ item, index }) =>
                                <MealItem
                                    meal={item}
                                    key={item.product_id}
                                    index={index}
                                    // selected={selectedMenuIndex}
                                    onPress={() => {
                                        navigate('MealScreen', {
                                            menu: {
                                                menu_id: selectMenuId,
                                                menu_nm: selectMenuNm
                                            },
                                            product: item,
                                            setOrderTmpByAmount: setOrderTmpByAmount
                                        })
                                    }}
                                />
                            }
                            keyExtractor={item => item.product_id}
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
                            source={{
                                uri: images.table_bg
                            }}
                            resizeMode='repeat'
                        >
                            <View style={styles.table_item}>
                                <Text style={styles.table_content}>
                                    TABLE NO:
                                </Text>
                                <View style={styles.table_btn}>
                                    <Text style={styles.table_no}>{tableNm}</Text>
                                </View>
                                <TouchableOpacity
                                    style={{
                                        marginLeft: 20,
                                    }}
                                    onPress={() => {
                                        setDigTableList(true)
                                        callGetTableList()
                                    }}>
                                    <Icon name='cog' size={30} color={'brown'} />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>

                    </View>
                    {/* List order */}
                    <View style={{ flex: 80, backgroundColor: 'white' }}>
                        <View style={{ flex: 1, margin: 10 }}>
                            <Text style={{ color: colors.color_tx, fontSize: sizes.font_sz_title, fontWeight: 'bold' }}>
                                ORDER LIST
                            </Text>
                            <FlatList
                                data={listOrderTmp.filter(item => item.product_order_stt_id == null)
                                    .map(item => ({
                                        "product_nm_vn": item.product_nm_vn,
                                        "count": item.count,
                                        "product_order_stt_id": null
                                    }))}
                                renderItem={({ item, index }) =>
                                    <OrderTmpItem
                                        order={item}
                                        key={item.product_id}
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
                                keyExtractor={item => item.product_id}
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
                                    setTableInfoId(null)
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
            <View style={{ flex: 20 }}></View>
            <TouchableOpacity
                onPress={() => {
                    console.log(tableInfoId)
                    if(tableInfoId != null){
                        //call waiter api
                        callPutMakeCalling()
                    }
                    else{
                        Toast('Please click [ORDER NOW] button before call waiter!')
                    }
                }}
                style={{
                    flex: 25,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Icon name={icons.ic_call_waiter} size={sizes.size_icon_footer} color={'blue'}></Icon>
                <Text style={{
                    color: colors.color_tx,
                    marginLeft: 10,
                    fontSize: sizes.font_sz_footer
                }}>Call waiter</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigate('OrderListScreen', {
                        listOrder: listOrderTmp
                    })
                }}
                style={{
                    flex: 25,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Icon name={icons.ic_order_list} size={sizes.size_icon_footer} color={'orangered'}></Icon>
                <Text style={{
                    color: colors.color_tx,
                    marginLeft: 10,
                    fontSize: sizes.font_sz_footer
                }}>Order list</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                flex: 25,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}
                onPress={() => {
                    navigate('ReceiptScreen', {
                        listOrder: listOrderTmp.filter(item => item.product_order_stt_id != null),
                        tableInfoId : tableInfoId
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
            <View style={{ flex: 20 }}></View>
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
        <ModalDialogTable
            visible={digTableList}
            data={listTable}
            onYes={(data) => {
                setTableId(data.table_id)
                setTableNm(data.table_nm)
                setDigTableList(false)
            }}
            onNo={() => {
                setDigTableList(false)
            }}>
        </ModalDialogTable>
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
        fontWeight: 'bold',
        fontSize: sizes.font_sz_title
    },
    table_btn: {
        height: 30,
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