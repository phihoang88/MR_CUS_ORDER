import React, { useState,useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native'
import { colors, icons, sizes, apis } from '../config'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { ReceiptItem } from '../screens'
import { Toast,Notification } from '../components'
import axios from 'axios'

const ReceiptScreen = (props) => {

    const { navigation, route } = props
    const { navigate, goBack } = navigation

    let tableInfoId = route.params.tableInfoId
    let tableId = route.params.table_id
    let tableNm = route.params.table_nm_vn

    const [listOrder, setListOrder] = useState([]) 

    // <-------------------initLoad-----------------------START>


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            //after goback
            callGetListOrdering()
        });
        //initload
        callGetListOrdering()
        return unsubscribe;
    }, [navigation])

    //call get List Ordering
    const callGetListOrdering = async () => {
        try {
            const res = await axios.get(`${apis.TABLE_ORDER_PATH}/getOrderingList/${tableInfoId}`)
            if(res.data.status == "success"){
                setListOrder(res.data.data)
            }
            else{
                setListOrder([])
                Toast('Get list failed.')
            }
        }
        catch (error) {
            console.log(`callGetListOrdering ${error}`)
        }
    }

    // <-------------------initLoad-------------------------END>

    function calculateTotal() {

        let sumAmount = listOrder.reduce(function (prev, current) {
            return prev + +current.count
        }, 0);

        let sumPrice = listOrder.reduce(function (prev, current) {
            return prev + +current.count * current.price
        }, 0);

        return {
            sumAmount: sumAmount,
            sumPrice: sumPrice
        }
    }

    // call waiter api for check out
    const callPutMakeCheckout = async () => {
        try {
            await callGetListOrdering()
            //check is till order has not done yet
            const found = listOrder.some(order => order.product_order_stt_id == 0)   
            if(found){
                Toast("Ordered food is preparing...Please wait!")
            }
            else{
                const res = await axios.put(`${apis.TABLE_INFO_PATH}/makeCalling/${tableInfoId}`)
                if (res.data.status == 'success') {
                    Toast('Waiter is coming...')
                    callNotification()
                    goBack()
                    route.params.setOrderTmpByAmount(null, true)
                }
                else {
                    Toast('Error happen! Please try again!')
                }
            } 
        }
        catch (error) {
            console.log(error.message)
        }
    }

    //callPost insert order list to DB
    const callNotification = async () => {
        try {
            await Notification.callSendNotification(Notification.CHECKOUT,{
                "table_id": tableId,
                "table_info_id": tableInfoId,
                "table_nm_vn": tableNm,
            })
        } catch (error) {
            console.log(`callNotification ${error}`)
        }
    }

    return <View style={{ flex: 1 }}>
        {/* tabbar */}
        <View style={{
            flex: 7,
            backgroundColor: colors.color_app,
            flexDirection: 'row',
            borderTopWidth: 1,
        }}>
            {/* back button */}
            <View style={{
                marginStart: 15,
                justifyContent: 'center',
                alignItems: 'flex-start',
            }}>
                <TouchableOpacity
                    onPress={() => {
                        goBack()
                    }}>
                    <Icon name={icons.ic_back_btn} size={sizes.size_icon_back} color={'grey'} />
                </TouchableOpacity>
            </View>
            {/* label */}
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 40
            }}>
                <Text style={{
                    color: 'black',
                    fontSize: sizes.font_sz_tabbar
                }}>CHECKOUT DETAIL</Text>
            </View>
        </View>
        {/* receipt detail */}
        <View style={{
            flex: 93,
            backgroundColor: 'white',
            flexDirection: 'row',
            borderTopWidth: 1,
            borderBottomWidth: 1,
        }}>
            <View style={{ flex: 25 }}></View>
            <View style={{ flex: 50, padding: 10 }}>
                {/* list ordered */}
                <View style={{ flex: 90, borderWidth: 1, borderRadius: 20 }}>
                    {/* header */}
                    <View style={{ flex: 5, flexDirection: 'row', padding: 10 }}>
                        <View style={{ flex: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Text style={{
                                fontSize: 18,
                                color: colors.color_imp,
                                fontWeight: 'bold'
                            }}>No.</Text>
                        </View>
                        <View style={{ flex: 55, justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Text style={{
                                fontSize: 18,
                                color: colors.color_imp,
                                fontWeight: 'bold'
                            }}>Meal</Text>
                        </View>
                        <View style={{ flex: 15, justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Text style={{
                                fontSize: 18,
                                color: colors.color_imp,
                                fontWeight: 'bold'
                            }}>Amount</Text>
                        </View>
                        <View style={{ flex: 20, justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Text style={{
                                fontSize: 18,
                                color: colors.color_imp,
                                fontWeight: 'bold'
                            }}>Price</Text>
                        </View>
                    </View>
                    {/* data */}
                    <View style={{ flex: 85 }}>
                        <FlatList
                            data={listOrder}
                            renderItem={({ item, index }) =>
                                <ReceiptItem receipt={item}
                                    key={index}
                                    index={index}
                                    //selected={selectedMenuIndex}
                                    onPress={() => {
                                    }}
                                />
                            }
                            keyExtractor={item => item.menu_id}
                        />
                    </View>
                    {/* total */}
                    <View style={{
                        flex: 10,
                        borderTopWidth: 2,
                        borderBottomWidth: 1,
                        borderBottomEndRadius: 15,
                        borderBottomStartRadius: 15,
                        flexDirection: 'row'
                    }}>
                        <View style={{ flex: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                        </View>
                        <View style={{ flex: 55, justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Text style={{
                                fontSize: 18,
                                color: colors.color_tx,
                                fontWeight: 'bold'
                            }}>Total</Text>
                        </View>
                        <View style={{ flex: 15, justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Text style={{
                                fontSize: 18,
                                color: colors.color_tx,
                                fontWeight: 'bold'
                            }}>{calculateTotal().sumAmount}</Text>
                        </View>
                        <View style={{ flex: 20, justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Text style={{
                                fontSize: 18,
                                color: colors.color_imp,
                                fontWeight: 'bold'
                            }}>{calculateTotal().sumPrice}</Text>
                        </View>
                    </View>
                </View>

                {/* button checkout */}
                <View style={{
                    flex: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            callPutMakeCheckout()
                        }}
                        style={{
                            height: '80%',
                            width: '50%',
                            backgroundColor: 'green',
                            borderRadius: 25,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: 'white'
                        }}
                        >CHECK OUT</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 25 }}></View>
        </View>
    </View>
}

export default ReceiptScreen