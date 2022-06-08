import React from 'react'
import { View, Text } from 'react-native'
import { colors, sizes } from '../../config'

const OrderItem = (props) => {

    console.log(props.order)
    let {
        product_id,
        product_nm_vn,
        product_order_stt_id,
        price,
        count
    } = props.order

    let indexRow = props.index

    return <View style={{ flex: 1 }}>
        <View style={{ flex: 5, flexDirection: 'row', padding: 10 }}>
            <View style={{ flex: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={{
                    fontSize: sizes.font_sz_notice,
                    color: colors.color_tx,
                }}>{indexRow + 1}</Text>
            </View>
            <View style={{ flex: 35, justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={{
                    fontSize: sizes.font_sz_notice,
                    color: colors.color_tx,
                }}>{product_nm_vn}</Text>
            </View>
            <View style={{ flex: 15, justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={{
                    fontSize: sizes.font_sz_notice,
                    color: colors.color_tx,
                }}>{count}</Text>
            </View>
            <View style={{ flex: 20, justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={{
                    fontSize: sizes.font_sz_notice,
                    color: colors.color_tx,
                }}>{price}</Text>
            </View>
            <View style={{ flex: 20, justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={{
                    fontSize: sizes.font_sz_notice,
                    color: colors.color_tx,
                }}>{product_order_stt_id == null ? "Selecting" : product_order_stt_id == 0 ? 'Preparing' : 'Done' }</Text>
            </View>
        </View>
        <View style={{backgroundColor:'black',height:1}}>

        </View>


    </View>
}

export default OrderItem