import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
} from 'react-native'
import { colors, sizes, images } from '../../config'


const MealItem = (props) => {
    let {
        product_id,
        product_nm_vn,
        product_nm_en,
        product_nm_jp,
        price,
        price_show,
        product_avatar,
        description,
        menu_id
    } = props.meal
    const { onPress } = props

    const [imageError, setImageError] = useState(true)

    const onImageNotFound = () => {
        setImageError(false)
    }

    return <View
        onPress={onPress}
        style={{
            width: '50%',
            height: Dimensions.get('window').height / 8,
            marginRight: 5,
            marginBottom: 5
        }}>
        <TouchableOpacity
            onPress={onPress}
            style={{
                flex: 1,
            }}>
            <View style={{
                flex: 1,
                backgroundColor: colors.color_app,
                borderRadius: 10,
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: 'grey'
            }}>
                <View style={{ flex: 40 }}>
                    <Image
                        source={
                            imageError ?
                                { uri: `${images.image_folder}/${product_avatar}` } :
                                require('../../assets/images/notfound.jpg')
                        }
                        resizeMode='cover'
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 10,
                        }}
                        onError={() => onImageNotFound()}
                    />
                </View>
                <View style={{ flex: 60 }}>
                    <View style={{ flex: 80, flexDirection: 'row' }}>
                        <View style={{
                            flex: 1,
                        }}>
                            <Text style={{
                                marginTop: 10,
                                marginLeft: 10,
                                marginRight: 10,
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: sizes.font_sz_title_item
                            }}>
                                {product_nm_vn || product_nm_en || product_nm_jp}
                            </Text>
                            <Text style={{
                                marginLeft: 10
                            }}>
                                {description != null ?
                                    description.length > sizes.maxlength_item ?
                                        description.substring(0, sizes.maxlength_item).concat('...') :
                                        description.substring(0, sizes.maxlength_item) : null}
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        flex: 20,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        marginEnd: 10
                    }}>
                        <Text style={{
                            color: 'red',
                            fontSize: sizes.font_sz_notice_item
                        }}>${price || price_show}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({


})
export default MealItem

