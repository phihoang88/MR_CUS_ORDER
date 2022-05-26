import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,

} from 'react-native'
import { colors, sizes } from '../../config'
import Icon from 'react-native-vector-icons/FontAwesome5'

const MealItem = (props) => {
    let {
        meal_id,
        meal_nm,
        meal_price,
        meal_image
    } = props.meal
    const { onPress } = props
    return <View
        onPress={onPress}
        style={{
            flex: 1,
            width: Dimensions.get('window').width / 6,
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
                        source={meal_image}
                        resizeMode='cover'
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 10,
                        }}
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
                                {meal_nm}
                            </Text>
                            <Text style={{
                                marginLeft: 10
                            }}>
                                {'ádhashdksahdashkdsjkdqwdqdwqdwqaddadaádasdsdád123'.length > sizes.maxlength_item ? 
                                'ádhashdksahdashkdsjkdqwdqdwqdwqaddadaádasdsdád123'.substring(0,sizes.maxlength_item).concat('...') : 
                                'ádhashdksahdashkdsjkdqwdqdwqdwqaddadaádasdsdád123'.substring(0,sizes.maxlength_item)}
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
                            fontSize:sizes.font_sz_notice_item
                        }}>${meal_price}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({


})
export default MealItem

