import * as React from 'react';

import { View, Text, StyleSheet, Image, Alert, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const baseURL = 'http://pedidos-test.herokuapp.com/api/item'
const options = {
    title: 'gerPed',
    takePhotoButtonTitle: 'Tirar foto do produto',
    chooseFromLibraryButtonTitle: 'Escolher foto do produto na galeria',
    maxWidth: 150,
    maxHeight: 150,
    allowsEditing: true,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },

}
const Product = ({ route, navigation }) => {

    const item = route.params.item

    //console.log(item)

    const [codItem, setCodItem] = React.useState(item._id);
    const [descItem, setDescItem] = React.useState(item.descricao);
    const [valItem, setValItem] = React.useState(item.valor);

    const [img, setImg] = React.useState(item.imagem)
    const [uri, setUri] = React.useState(source = { uri: 'data:image/jpeg;base64,' + item.imagem })


    updateItem = async () => {

        console.log(img)

        try {
            const response = await fetch(baseURL + '/' + codItem, {
                method: 'put',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    descricao: descItem,
                    valor: valItem,
                    imagem: img
                }),
            });
            navigation.navigate('ProductList')
        } catch (error) {
            Alert.alert(error.toString())
        }
    }

    deleteItem = async () => {

        try {
            await fetch(baseURL + '/' + codItem, {
                method: 'delete',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            navigation.navigate('ProductList')
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
                let source = { uri: response.uri };

                // You can also display the image using data:
                //let source = { uri: 'data:image/jpeg;base64,' + response.data };
                setImg(response.data)
                setUri(source)
            }
        });
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={"position"}>
            <View style={styles.item}>
                <View style={styles.picker}>
                    <TouchableOpacity style={styles.pickerButton} onPress={myFun}>
                        <View style={styles.pickerButtonText}>
                            <Text>Escolher Imagem...</Text>
                        </View>
                        <Image source={uri} style={styles.pickerImage}>
                        </Image>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.item}>
                <Text>Descricao do Produto</Text>
                <TextInput
                    style={styles.itemInput}
                    value={descItem}
                    onChangeText={(txt) => {
                        setDescItem(txt)
                    }}
                >
                </TextInput>
            </View>
            <View style={styles.item}>
                <Text>Valor do Produto</Text>
                <TextInput
                    style={styles.itemInput}
                    value={valItem.toString()}
                    onChangeText={(txt) => { !txt ? setValItem(0) : setValItem(parseInt(txt)) }}
                >
                </TextInput>
            </View>
            <View style={styles.item}>
                <TouchableOpacity
                    style={styles.buttonAdd}
                    onPress={() => {
                        item.descricao != descItem || item.valor != valItem || item.imagem != img ? updateItem() : null
                        //console.log(item.descricao,item.valor, descItem, valItem)
                    }}
                >
                    <Text style={styles.buttonText} >Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonDel}
                    onPress={() => {
                        Alert.alert(
                            'Deletar Produto',
                            'Deseja realmente deletar esse produto?',
                            [
                              {text: 'Cancelar',onPress: () => null},
                              {text: 'Deletar', onPress: () => deleteItem()},
                            ],
                            {cancelable: false},
                          );
                        //console.log(item.descricao,item.valor, descItem, valItem)
                    }}
                >
                    <Text style={styles.buttonText} >Deletar</Text>
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
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 10

    },
    item: {
        marginTop: 10
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
    buttonAdd: {
        backgroundColor: '#40E0D0',
        justifyContent: "center",
        width: 350,
        height: 75,
        borderRadius: 10,
        marginBottom: 10
    },
    buttonDel: {
        backgroundColor: '#FF0000',
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
        alignItems: "center",
        justifyContent: "center"

    },
    pickerImage: {
        width: 200,
        height: 200,
        borderRadius: 125,
        borderWidth: 1,
        borderColor: '#40E0D0',
    },
    pickerButton: {
        width: 150,
        height: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    pickerButtonText: {
        paddingLeft: 5,
        position: "absolute",
        zIndex: 1,
        fontSize: 15,
        color: '#111',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#40E0D0',
        color: '#111',
        fontWeight: "bold",
        opacity: 0.5,
        backgroundColor:'#fff'
    },
});

export default Product;