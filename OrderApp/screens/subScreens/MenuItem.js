import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native'
import { colors, images } from '../../config'
import Icon from 'react-native-vector-icons/FontAwesome5'

const MenuItem = (props) => {
    let {
        menu_id,
        menu_nm_vn,
        menu_nm_en,
        menu_nm_jp,
        menu_img,
    } = props.menu
    const { onPress } = props

    const [imageError, setImageError] = useState(true)

    const onImageNotFound = () => {
        setImageError(false);
    }

    return <View style={{
        flex: 1,
        marginRight: 10,
        paddingTop: 10,
    }}>
        <TouchableOpacity
            onPress={onPress}
            style={{
                flex: 1,
                borderRadius: 25,
                borderWidth: 1,
                width: (Dimensions.get('window').width / 2) / 4 - 10.4,
                backgroundColor: props.index == props.selected ? colors.color_app : 'white',
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
                    source={
                        imageError ?
                            { uri: `${images.image_folder}/${menu_img}` } :
                            require('../../assets/images/notfound.jpg')
                    }
                    onError={() =>
                        onImageNotFound()}
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
                    fontSize: 16,
                }}>
                    {menu_nm_vn || menu_nm_en || menu_nm_jp}
                </Text>
            </View>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({

})
export default MenuItem

