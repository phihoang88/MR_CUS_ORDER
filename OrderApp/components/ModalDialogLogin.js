import React, { useState,useEffect } from 'react'
import {
    View,
    StyleSheet,
    Modal,
    Text,
    TouchableOpacity,
    TextInput
} from 'react-native'

const ModalDialogLogin = ({ visible, title, onYes, onNo }) => {

    const [username, onChangeUsername] = useState('')
    const [password, onChangePassword] = useState('')

    useEffect(() => {
        onChangeUsername('')
        onChangePassword('')
    },[visible])

    return <Modal transparent visible={visible}>
        <View style={styles.modalBackGround}>
            <View style={styles.modalContainer}>
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{
                        flex: 20,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={styles.title}>{title}</Text>
                    </View>

                    <View style={{
                        flex: 60,
                    }}>
                        <View style={{
                            flex: 50,
                            marginBottom: 5
                        }}>
                            <TextInput
                                style={{
                                    borderWidth: 1,
                                    borderRadius: 15,
                                    textAlign:'center',
                                    textAlignVertical:'center',
                                    fontSize:16,
                                    color:'black'
                                }}
                                placeholder='Username'
                                value={username}
                                onChangeText={(text) => onChangeUsername(text)}
                            />
                        </View>
                        <View style={{
                            flex: 50,
                            marginBottom: 5
                        }}>
                            <TextInput
                                style={{
                                    borderWidth: 1,
                                    borderRadius: 15,
                                    textAlign:'center',
                                    textAlignVertical:'center',
                                    fontSize:16,
                                    color:'black'
                                }}
                                placeholder='Password'
                                value={password}
                                onChangeText={(text) => onChangePassword(text)}
                            />
                        </View>
                    </View>
                    <View style={{
                        flex: 20,
                        justifyContent: 'space-evenly',
                        alignItems: 'flex-end',
                        flexDirection: 'row',
                    }}>
                        <View style={{ flex: 50, borderTopWidth: 1, marginRight: 2 }}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    onYes(username,password)
                                }}>
                                <Text style={styles.text}>Enter</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 50, borderTopWidth: 1 }}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    onNo()
                                }}>
                                <Text style={styles.text}>Back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    </Modal >
}

const styles = StyleSheet.create({
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '30%',
        height: 200,
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 20
    },
    title: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold'
    },
    text: {
        color: 'black'
    }
})

export default ModalDialogLogin

