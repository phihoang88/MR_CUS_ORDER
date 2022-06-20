import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native'
import { colors, icons, sizes } from '../config'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { OrderItem } from '../screens'



const OrderListScreen = (props) => {

    const { navigation, route } = props
    const { navigate, goBack } = navigation


    let listOrder = route.params.listOrder

    // <-------------------initLoad-----------------------START>

    const [listReceipt, setListReceipt] = useState(listOrder.length > 0 ? listOrder : [])

    

    // <-------------------initLoad-------------------------END>

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
                }}>ORDER LIST</Text>
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
            <View style={{ flex: 10 }}></View>
            <View style={{ flex: 80, padding: 10 }}>
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
                        <View style={{ flex: 35, justifyContent: 'flex-start', alignItems: 'center'}}>
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
                        <View style={{ flex: 20, justifyContent: 'flex-start', alignItems: 'center'}}>
                            <Text style={{
                                fontSize: 18,
                                color: colors.color_imp,
                                fontWeight: 'bold'
                            }}>Status</Text>
                        </View>
                    </View>
                    {/* data */}
                    <View style={{ flex: 85 }}>
                        <FlatList
                            data={listReceipt}
                            renderItem={({ item, index }) =>
                                <OrderItem order={item}
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
                </View>
            </View>
            <View style={{ flex: 10 }}></View>
        </View>
    </View>
}

export default OrderListScreen