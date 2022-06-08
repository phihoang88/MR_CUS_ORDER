import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { colors, icons, sizes } from '../../config'
import Icon from 'react-native-vector-icons/FontAwesome5'

const OrderTmpItem = (props) => {

    let {
        product_id,
        product_nm_vn,
        product_nm_en,
        product_nm_jp,
        product_avatar,
        price,
        price_show,
        count,
        product_order_stt_id
    } = props.order
    let onPressDown = props.onPressDown
    let onPressUp = props.onPressUp
    let onPressDel = props.onPressDel

    return <View 
        key={product_id}
    style={{
        flex: 100,
        flexDirection: 'row',
        height: 60,
        width: '100%',
    }}>

        <View style={{
            flex: 25,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Image
                source={require('../../assets/images/meal1.jpg')}
                resizeMode='stretch'
                style={{
                    height: '80%',
                    width: '80%',
                    borderRadius: 35,
                }}
            />
        </View>
        <View style={{
            flex: 25,
            justifyContent: 'center',
            alignItems: 'flex-start',
        }}>
            <Text style={{ color: colors.color_tx }}>
                {product_nm_vn.length > sizes.maxlength_item_tmp ?
                    product_nm_vn.substring(0, sizes.maxlength_item_tmp).concat('...') :
                    product_nm_vn.substring(0, sizes.maxlength_item_tmp)}
            </Text>
        </View>

        <View style={{
            flex: 35,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
        }}>
            <TouchableOpacity
                disabled={product_order_stt_id == 1 ? true : false}
                onPress={onPressDown}>
                <Icon name={icons.ic_down} color={product_order_stt_id == 1 ? 'grey':'brown'} size={sizes.size_icon_count} style={{ marginRight: 5 }}></Icon>
            </TouchableOpacity>

            <Text style={{
                height: 30,
                width: 30,
                borderWidth: 1,
                borderRadius: 10,
                textAlign: 'center',
                textAlignVertical: 'center',
                marginRight: 5
            }}>{count}</Text>

            <TouchableOpacity
                disabled={product_order_stt_id == 1 ? true : false}
                onPress={onPressUp}>
                <Icon name={icons.ic_up} color={product_order_stt_id == 1 ? 'grey':'green'} size={sizes.size_icon_count}></Icon>
            </TouchableOpacity>
        </View>
        <View style={{
            flex: 15,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
        }}>
            <TouchableOpacity
                onPress={onPressDel}
                disabled={product_order_stt_id == 1 ? true : false}
            >
                <Icon name={icons.ic_delete} color={product_order_stt_id == 1 ? 'grey' : 'red'} size={sizes.size_icon_count}></Icon>
            </TouchableOpacity>
        </View>
    </View>
}

export default OrderTmpItem