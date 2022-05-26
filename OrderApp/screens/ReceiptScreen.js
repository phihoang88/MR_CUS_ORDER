import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native'
import { colors, icons, sizes } from '../config'
import Icon from 'react-native-vector-icons/FontAwesome5'
// import { listOrder } from '../contents'
import { ReceiptItem } from '../screens'


const ReceiptScreen = (props) => {

    const { navigation, route } = props
    const { navigate, goBack } = navigation


    let listOrder = route.params.listOrder

    // <-------------------initLoad-----------------------START>

    const [listReceipt, setListReceipt] = useState(listOrder.length > 0 ? listOrder : [])

    

    // <-------------------initLoad-------------------------END>

    function calculateTotal() {

        let sumAmount = listReceipt.reduce(function (prev, current) {
            return prev + +current.meal_count
        }, 0);

        let sumPrice = listReceipt.reduce(function (prev, current) {
            return prev + +current.meal_count*current.meal_price
        }, 0);

        return {
            sumAmount: sumAmount,
            sumPrice : sumPrice
        }
    }

    return <View style={{ flex: 1 }}>
        {/* tabbar */}
        <View style={{
            flex: 7,
            backgroundColor: colors.color_app,
            flexDirection: 'row',
            borderTopWidth: 1,
            borderBottomWidth: 1,
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
                            data={listReceipt}
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