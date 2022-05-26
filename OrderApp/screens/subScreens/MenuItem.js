import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native'
import { colors } from '../../config'
import Icon from 'react-native-vector-icons/FontAwesome5'

const MenuItem = (props) => {
    let {
        menu_id,
        menu_nm,
        menu_image
    } = props.menu

    const { onPress } = props
    return <View style={{
        flex: 1,
        marginRight: 10,
        paddingTop: 10
    }}>
        <TouchableOpacity
            onPress={onPress}
            style={{
                flex: 1,
                width: (Dimensions.get('window').width / 2) / 4 - 10.4,
                backgroundColor: props.index == props.selected ? colors.color_app : 'white' ,
            }}>
            <View style={{
                flex: 90,
            }}>
                <Image style={{
                    borderRadius: 60,
                    height: '100%',
                    width: '100%'
                }}
                    resizeMode='stretch'
                    source={menu_image}
                >
                </Image>
            </View>
            <View style={{
                height: 20,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{
                    color: props.index == props.selected ? 'red' : 'black',
                    fontWeight: props.index == props.selected ? 'bold' : 'normal',
                    fontSize:16,
                }}>
                    {menu_nm}
                </Text>
            </View>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    
})
export default MenuItem

