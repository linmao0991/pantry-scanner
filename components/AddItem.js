import React,{useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, TouchableHighlight, FlatList, Modal, Image, TextInput} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import CameraOverlay from './CameraOverlay';
import API from '../util/Api'

const AddItem = props => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [barcode, setBarcode] = useState(null);
    const [productData, setProductData] = useState(null);
    const [modalVisible, setModalVisible] = useState(true);

    useEffect(() => {
        (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      setBarcode({code: data, type: type})
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    const searchBarcode = () => {
        console.log("Search Barcode")
        if(barcode && barcode.code !== ''){
            API.barcodeSearch(barcode).then( response => {
                let newList = []
                if(productData){
                    newList = [...productData,...response.data.items]
                }else{
                    newList = [...response.data.items]
                }
                setProductData(newList)
                toggleModal(false)
                setBarcode(null)
                console.log(newList)
            })
        }
    }

    const toggleModal = (boolean) => {
        setModalVisible(boolean)
        setScanned(false)
    }

    const renderItem = ({ item }) => (
        <View style={style.productData}>
            <Text>{item.title}</Text>
            <Text>Brand: {item.brand}</Text>
            <Text>Dimension: {item.dimension}</Text>
            <Text>Description: {item.description}</Text>      
        </View>
      );

    return ( 
      <View style={style.container}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            }}
        >
            <View style={style.modal}>
                <View style={style.modalHeader}>
                    <TouchableHighlight style={style.modalClose} activeOpacity={0.6} underlayColor="#DDDDDD" onPress={() => setModalVisible(false)}>
                        <View style={style.modalCloseView}>
                            <Text style={style.modalCloseText}>Close</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={style.camera}
                >
                    <CameraOverlay
                        scanned = {scanned}
                    />
                </BarCodeScanner>
                {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
                {scanned? 
                    <View style={style.barcodeSection}> 
                        <Text>Barcode: {barcode.code}</Text>
                        <Text>Type: {barcode.type}</Text>
                        <TouchableHighlight style={style.touchable} activeOpacity={0.6} underlayColor="#DDDDDD" onPress={searchBarcode}>
                            <View style={style.button}>
                                <Text>Search Code</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                : null}
                </View>
        </Modal>
        <View style={style.barcodeNav}>
            <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" onPress={() => toggleModal(true)}>
                <Image 
                    style={style.barcodeImg}
                    source={require('../assets/barcode.png')}
                />
            </TouchableHighlight>
            <View style={style.barcodeInputContainer}>
                <TextInput
                    placeholder={barcode? barcode.code:"Barcode"}
                    style={style.barcodeInput}
                    onChangeText={(text) => {setBarcode({code: text, type: null})}}
                />
            </View>
            <TouchableHighlight style={style.searchBarcode} activeOpacity={0.6} underlayColor="#DDDDDD" onPress={searchBarcode}>
                <View style={style.button}>
                    <Text>Search</Text>
                </View>
            </TouchableHighlight>
        </View>
        {productData?
            <FlatList
                data={productData}
                renderItem={renderItem}
                keyExtractor={(item,index )=> item.ean+''+index}
                style = {style.productFlatMap}
            />
        :null}
      </View>
    );
}

const style=StyleSheet.create({
    container: {
        padding: 5,
        alignItems: 'center',
    },
    barcodeImg: {
        height: 50,
        width: 50
    },
    barcodeInput: {
        flex: 1,
    },
    barcodeInputContainer: {
        flex: 4,
        padding: 5,
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 10,
        //width: '60%',
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        height: '75%',
    },
    barcodeNav: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    barcodeSection: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: '100%',
        alignItems: "center",
        padding: 10,
        borderStyle: 'solid',
        borderColor: '#6e6e6e',
        borderWidth: 1,
        borderRadius: 5
    },
    camera: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        width: 350,
        height: 350,
        //width: '100%',
        borderRadius: 10,
    },
    modal:{
        marginLeft: 5,
        marginRight: 5,
        marginTop: 140,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        backgroundColor: 'white',
    },
    modalClose: {
        flex: 1,
        alignItems: 'flex-end',
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    modalCloseText: {
        color: 'white'
    },
    modalCloseView: {
        width: '20%',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#457B9D',
        borderRadius: 5,
    },
    modalHeader: {
        flexDirection: 'row',
    },
    productData: {
        marginTop: 5,
        marginBottom: 5,
        borderColor: 'grey',
        borderWidth: 2,
        borderRadius: 5,
        padding: 5,
        width: '100%',
    },
    productFlatMap: { 
        height: '100%'
    },
    searchBarcode: {
        flex: 2,
    },
    touchable: {
        width: '33%',
        alignItems: "stretch",
    },
})

export default AddItem;