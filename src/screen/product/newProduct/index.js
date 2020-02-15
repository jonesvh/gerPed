import * as React from 'react';

import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, KeyboardAvoidingView } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const baseURL = 'http://pedidos-test.herokuapp.com/api/item'
const options = {
    title: 'gerPed',
    takePhotoButtonTitle: 'Tirar foto do produto',
    chooseFromLibraryButtonTitle: 'Escolher foto do produto na galeria',
    maxWidth:150,
    maxHeight:150,
    allowsEditing:true,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },

}
const NewProduct = ({ navigation }) => {


    const [nameProduct, setNameProduct] = React.useState('')
    const [valorProduct, setValorProduct] = React.useState(0)

    const [img, setImg] = React.useState(null)
    const [uri, setUri] = React.useState(null)

    addItem = async () => {

        try {
            const response = await fetch(baseURL, {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    descricao: nameProduct,
                    valor: valorProduct,
                    imagem:img
                }),
            });
        } catch (error) {
            Alert.alert(error.toString())
        }
    }

    myFun = () => {
        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                //console.log('User cancelled image picker');
            }
            else if (response.error) {
                //console.log('Image Picker Error: ', response.error);
            }

            else {
                //let source = { uri: response.uri };

                // You can also display the image using data:
                let source = { uri: 'data:image/jpeg;base64,' + response.data};

                //console.log(response.data.toString())

                setImg(response.data)
                setUri(source)
            }
        });
    }

    return (
        <KeyboardAvoidingView style={styles.item} behavior={"position"}>
            <View style={styles.picker}>
                {img ? <Image source={uri} style={styles.pickerImage}></Image> : <TouchableOpacity style={styles.pickerButton} onPress={myFun}><Text>Escolher Imagem...</Text></TouchableOpacity>}
            </View>
            <View style={styles.item}>
                <Text>Descricao do Produto</Text>
                <TextInput
                    style={styles.itemInput}
                    onChangeText={(txt) => { setNameProduct(txt) }}
                    value={nameProduct}
                >
                </TextInput>
            </View>
            <View style={styles.item}>
                <Text>Valor do Produto</Text>
                <TextInput
                    style={styles.itemInput}
                    onChangeText={(txt) => { !txt ? setValorProduct(0) : setValorProduct(parseInt(txt)) }}
                    value={valorProduct.toString()}
                >
                </TextInput>
            </View>
            <View style={styles.item}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        addItem()
                        navigation.navigate('ProductList', { reload: false })
                    }}
                >
                    <Text style={styles.buttonText} >Salvar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: "flex-start",
        alignItems: "center",
        paddingBottom: 50

    },
    item: {
        marginTop: 20,
        alignItems:"center"
    },
    itemInput: {
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: '#40E0D0',
        borderRadius: 10,
        width: 350,
        height: 50,
    },
    itemInputDiasble: {
        backgroundColor: '#DCDCDC',
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: '#40E0D0',
        borderRadius: 10,
        width: 350,
        height: 50,
    },
    ItemImage: {
        width: 200,
        height: 200,
    },
    button: {
        backgroundColor: '#40E0D0',
        justifyContent: "center",
        width: 350,
        height: 75,
        borderRadius: 10
    },
    buttonText: {
        color: '#fff',
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold"
    },
    picker: {
        height: 250,
        marginTop: 20,
        marginBottom: 35,
        alignItems: "center",
        justifyContent: "center"

    },
    pickerImage: {
        width: 250,
        height: 250,
        borderRadius: 125
    },
    pickerButton: {
        marginTop: 10,
        width: 150,
        height: 30,
        borderWidth: 1,
        borderColor: '#40E0D0',
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center"
    }

});

export default NewProduct;