import React from 'react'
import { View, Text } from 'react-native'
import { colors, sizes } from '../../config'

const ReceiptItem = (props) => {

    let {
        meal_id,
        meal_nm,
        meal_price,
        meal_count
    } = props.receipt

    let indexRow = props.index

    return <View style={{ flex: 1 }}>
        <View style={{ flex: 5, flexDirection: 'row', padding: 10 }}>
            <View style={{ flex: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={{
                    fontSize: sizes.font_sz_notice,
                    color: colors.color_tx,
                }}>{indexRow + 1}</Text>
            </View>
            <View style={{ flex: 55, justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={{
                    fontSize: sizes.font_sz_notice,
                    color: colors.color_tx,
                }}>{meal_nm}</Text>
            </View>
            <View style={{ flex: 15, justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={{
                    fontSize: sizes.font_sz_notice,
                    color: colors.color_tx,
                }}>{meal_count}</Text>
            </View>
            <View style={{ flex: 20, justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={{
                    fontSize: sizes.font_sz_notice,
                    color: colors.color_tx,
                }}>{meal_price}</Text>
            </View>
        </View>
        <View style={{backgroundColor:'black',height:1}}>

        </View>


    </View>
}

export default ReceiptItem