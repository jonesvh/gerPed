import * as React from 'react';

import { View, Text, StyleSheet, Image, Alert,TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';

const baseURL = 'http://pedidos-test.herokuapp.com/api/categoria'

const CategoryItem = ({ route, navigation }) => {

    const item = route.params.item

    const [codItem, setCodItem] = React.useState(item._id);
    const [descItem, setDescItem] = React.useState(item.descricao);

    updateItem = async () => {

        console.log(baseURL + codItem)

        try {
            const response = await fetch(baseURL + '/' + codItem, {
                method: 'put',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    descricao: descItem,
                }),
            });
            navigation.navigate('CategoryList')
        } catch (error) {
            Alert.alert(error.toString())
        }
    }

    deleteItem = async () => {

        try {
            const response = await fetch(baseURL + '/' + codItem, {
                method: 'delete',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            navigation.navigate('CategoryList')
        } catch (error) {
            Alert.alert(error.toString())
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={"position"}>
            <View style={styles.item}>
                <Text>Descricao da Categoria</Text>
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
                <TouchableOpacity
                    style={styles.buttonAdd}
                    onPress={() => {
                        item.descricao != descItem ? updateItem() : null
                    }}
                >
                    <Text style={styles.buttonText} >Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonDel}
                    onPress={() => {
                        deleteItem()
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
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 10,
        paddingTop:100

    },
    item: {
        marginBottom:30
    },
    itemInput: {
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: '#40E0D0',
        borderRadius: 10,
        width: 350,
        height: 50,
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

});

export default CategoryItem;