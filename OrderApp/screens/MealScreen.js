import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native'
import { colors, sizes, icons, images } from '../config'
import Icon from 'react-native-vector-icons/FontAwesome5'
const MealScreen = (props) => {

    const { navigation, route } = props
    const { navigate, goBack } = navigation

    // <-------------------InitLoad---------------------->START
    //get params navigation
    let {
        menu_id,
        menu_nm
    } = route.params.menu
    let {
        description,
        price,
        price_show,
        product_avatar,
        product_id,
        product_nm_en,
        product_nm_jp,
        product_nm_vn
    } = route.params.product

    //set init Amount
    const [amount, setAmount] = useState(1)
    // <-------------------InitLoad---------------------->END

    const [imageError, setImageError] = useState(true)

    const onImageNotFound = () => {
        setImageError(false)
    }

    const [isVisible, setVisible] = useState(false)

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
                }}>ORDER DETAIL</Text>
            </View>
        </View>
        {/* detail */}
        <View style={{
            flex: 93,
            flexDirection: 'row'
        }}>
            <View style={{
                backgroundColor: 'white',
                height: Dimensions.get('window').width / 2,
                width: Dimensions.get('window').width / 2,
                padding: 20
            }}>
                <Image
                    source={
                        imageError ?
                        {uri : `${images.image_folder}/${product_avatar}`} : 
                        require('../assets/images/notfound.jpg')
                    }
                    style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: 50
                    }}
                    onError={() => onImageNotFound()}
                />
            </View>
            <View style={{
                backgroundColor: 'white',
                height: Dimensions.get('window').width / 2,
                width: Dimensions.get('window').width / 2,
                padding: 20
            }}>
                <View style={{ flex: 50 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 50 }}>
                            <Text style={{ color: 'black', fontSize: sizes.font_sz_title }}>
                                {product_nm_vn || product_nm_en || product_nm_jp}
                            </Text>
                        </View>
                        <View style={{ flex: 50, alignItems: 'flex-end', marginTop: 5 }}>
                            <Text style={{ color: 'red', fontSize: sizes.font_sz_notice }}>
                                ${price || price_show}
                            </Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: 'black', height: 1 }}></View>

                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: 'red', fontSize: sizes.font_sz_notice }}>
                            {menu_nm}
                        </Text>
                        <Text>
                            {description}
                        </Text>
                    </View>
                </View>
                <View style={{
                    flex: 50,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                }}>
                    <View style={{
                        flex: 50,
                        flexDirection: 'row',
                    }}>
                        <Text style={{
                            fontSize: sizes.font_sz_notice,
                            textAlign: 'center',
                            color: 'black',
                            marginRight: 10,
                            marginTop: 13
                        }}>
                            Amount
                        </Text>
                        <TouchableOpacity style={{ marginRight: 10, marginTop: 10 }}
                            onPress={() => {
                                if (amount > 1) {
                                    setAmount(amount - 1)
                                }
                            }}>
                            <Icon name={icons.ic_down} size={sizes.size_icon_count} color={'brown'} />
                        </TouchableOpacity>
                        <Text
                            style={{
                                height: 40,
                                width: 40,
                                fontSize: 15,
                                borderWidth: 1,
                                borderRadius: 10,
                                marginRight: 10,
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                fontWeight: 'bold',
                                fontSize: sizes.font_sz_amount,
                                marginTop: 2
                            }}
                        >
                            {amount}
                        </Text>
                        <TouchableOpacity style={{ marginRight: 10, marginTop: 10 }}
                            onPress={() => {
                                setAmount(amount + 1)
                            }}>
                            <Icon name={icons.ic_up} size={sizes.size_icon_count} color={'green'} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flex: 50,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity
                            style={{
                                height: 40,
                                width: '80%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 20,
                                backgroundColor: 'orangered',
                            }}
                            onPress={() => {
                                goBack()
                                route.params.setOrderTmpByAmount({ data: {
                                    count : amount,
                                    product_order_stt_id : null,
                                    product_nm_vn : product_nm_vn,
                                    product_id : product_id,
                                    price : price
                                }})
                            }}
                        >
                            <Text style={{ color: 'yellow', fontWeight: 'bold' }}>ADD TO ORDER</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, borderWidth: 1 }}>

            </View>
        </View>
    </View>
}

export default MealScreen