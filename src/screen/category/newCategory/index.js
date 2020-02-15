import * as React from 'react';

import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, KeyboardAvoidingView } from 'react-native';

const baseURL = 'http://pedidos-test.herokuapp.com/api/categoria'
const NewCategory = ({ navigation }) => {


    const [nameCategory, setNameCategory] = React.useState('')

    addItem = async () => {

        try {
            const response = await fetch(baseURL, {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    descricao: nameCategory,
                }),
            });
        } catch (error) {
            Alert.alert(error.toString())
        }
    }

    return (
        <KeyboardAvoidingView style={styles.item} behavior={"position"}>
            <View style={styles.item}>
                <Text>Descricao da Categoria</Text>
                <TextInput
                    style={styles.itemInput}
                    onChangeText={(txt) => { setNameCategory(txt) }}
                    value={nameCategory}
                >
                </TextInput>
            </View>
            <View style={styles.item}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        addItem()
                        navigation.navigate('CategoryList')
                    }}
                >
                    <Text style={styles.buttonText} >Salvar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({

    item: {
        marginTop: 50,
        marginBottom:100,
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
});

export default NewCategory;