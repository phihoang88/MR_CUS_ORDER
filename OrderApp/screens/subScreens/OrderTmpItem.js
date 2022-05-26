import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { colors, icons, sizes } from '../../config'
import Icon from 'react-native-vector-icons/FontAwesome5'

const OrderTmpItem = (props) => {
    let {
        meal_id,
        meal_nm,
        meal_image,
        meal_price,
        meal_count,
        meal_order_stt
    } = props.order
    let onPressDown = props.onPressDown
    let onPressUp = props.onPressUp
    let onPressDel = props.onPressDel

    return <View style={{
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
                source={meal_image}
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
                {meal_nm.length > sizes.maxlength_item_tmp ?
                    meal_nm.substring(0, sizes.maxlength_item_tmp).concat('...') :
                    meal_nm.substring(0, sizes.maxlength_item_tmp)}
            </Text>
        </View>

        <View style={{
            flex: 35,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
        }}>
            <TouchableOpacity
                disabled={meal_order_stt == true ? true : false}
                onPress={onPressDown}>
                <Icon name={icons.ic_down} color={meal_order_stt == true ? 'grey':'brown'} size={sizes.size_icon_count} style={{ marginRight: 5 }}></Icon>
            </TouchableOpacity>

            <Text style={{
                height: 30,
                width: 30,
                borderWidth: 1,
                borderRadius: 10,
                textAlign: 'center',
                textAlignVertical: 'center',
                marginRight: 5
            }}>{meal_count}</Text>

            <TouchableOpacity
                disabled={meal_order_stt == true ? true : false}
                onPress={onPressUp}>
                <Icon name={icons.ic_up} color={meal_order_stt == true ? 'grey':'green'} size={sizes.size_icon_count}></Icon>
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
                disabled={meal_order_stt == true ? true : false}
            >
                <Icon name={icons.ic_delete} color={meal_order_stt == true ? 'grey' : 'red'} size={sizes.size_icon_count}></Icon>
            </TouchableOpacity>
        </View>
    </View>
}

export default OrderTmpItem