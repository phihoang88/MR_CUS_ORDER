import React, { useState,useEffect } from 'react'
import {
    View,
    StyleSheet,
    Modal,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Image,
} from 'react-native'
import { images } from '../config'

const ModalDialogTable = ({ visible, data, onYes, onNo }) => {
    const [selectedTable , setSelectedTable] = useState(null)
    const [selectedTableId, setSelectedTableId] = useState(null)
    const [selectedTableNm, setSelectedTableNm] = useState('')
    return <Modal transparent visible={visible}>
        <View style={styles.modalBackGround}>
            <View style={styles.modalContainer}>
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{
                        flex: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={styles.title}>Table selecting</Text>
                    </View>

                    <View style={{
                        flex: 70,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <FlatList
                            data={data}
                            numColumns={5}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedTable(index)
                                        setSelectedTableId(item.table_id)
                                        setSelectedTableNm(item.table_nm_vn)
                                    }}
                                    key={item.table_id}
                                    style={{
                                        borderWidth: selectedTable == index ? 5 : 1,
                                        borderColor: selectedTable == index ? 'red' : 'black',
                                        borderRadius: 10,
                                        marginLeft: 5,
                                        marginBottom: 5,
                                        height: Dimensions.get('window').height * 0.6 / 5,
                                        width: Dimensions.get('window').width * 0.6 / 5 - 15,
                                        justifyContent: 'flex-end',
                                        alignItems: 'center'
                                    }}>
                                    <Image
                                        source={{
                                            uri: images.table_icon
                                        }}
                                        style={{
                                            height: '75%',
                                            width: '60%',
                                        }}
                                    />
                                    <Text style={{
                                        fontSize: 16,
                                        color: 'black',
                                        height:'25%'
                                    }}>{item.table_nm_vn || item.table_nm_jp || item.table_nm_en}</Text>
                                </TouchableOpacity>
                            }
                            keyExtractor={item => item.table_id}
                        />
                    </View>
                    <View style={{
                        flex: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                        <Text style={styles.title}>Table selected: </Text>
                        <Text style={{
                            color:'red',
                            fontSize:18,
                            fontWeight:'bold'
                        }}>{selectedTableNm}</Text>
                    </View>

                    < View style={{
                        flex: 10,
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
                                    onYes({
                                        table_id : selectedTableId,
                                        table_nm : selectedTableNm
                                    })
                                }}>
                                <Text style={styles.text}>OK</Text>
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
                                <Text style={styles.text}>Cancel</Text>
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
        width: '60%',
        height: '60%',
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 20
    },
    title: {
        fontSize: 18,
        color: 'black',
    },
    text: {
        color: 'black'
    }
})

export default ModalDialogTable

