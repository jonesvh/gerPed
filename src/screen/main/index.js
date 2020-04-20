import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';

function Main({ navigation }){

    const [reload, setReload] = React.useState([false])

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.mainHeader}>
                <Text style={styles.mainHeaderText}>gerPed</Text>
            </View>
            <View style={styles.mainBody}>
                <TouchableOpacity
                    style={styles.mainBodyItem}
                    onPress={() => { navigation.navigate('OrderList') }}
                >
                    <Image
                        source={require('../../icons/png/003-order.png')}
                        style={styles.mainBodyItemImage}
                    ></Image>
                    <Text style={styles.mainBodyItemText}>PEDIDOS</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.mainBodyItem}
                    onPress={() => { navigation.navigate('ProductList')}}
                >
                    <Image
                        source={require('../../icons/png/012-menu.png')}
                        style={styles.mainBodyItemImage}
                    ></Image>
                    <Text style={styles.mainBodyItemText}>PRODUTOS</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.mainBodyItem}
                    onPress={() => { navigation.navigate('CategoryList')}}
                >
                    <Image
                        source={require('../../icons/png/034-soda.png')}
                        style={styles.mainBodyItemImage}
                    ></Image>
                    <Text style={styles.mainBodyItemText}>CATEGORIAS</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: "#fff",
        flexDirection: "column",
    },
    mainHeader: {
        flex: 1,
        backgroundColor: '#40E0D0',
        alignContent: 'stretch',
        height: 250,
        alignItems: "center",
        justifyContent: 'center',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        marginBottom:15
    },
    mainHeaderText: {
        //fontFamily:'Montserrat',
        fontSize: 50,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 3,
        color: '#483D8B',
        fontWeight: "bold",
        padding: 10
    },

    //=======  BODY  =========//

    mainBody: {
        flex: 2,
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: '#fff',
        justifyContent: 'space-evenly'
    },
    mainBodyItem: {
        backgroundColor: '#fff',
        width: 150,
        height: 150,
        marginBottom: 35,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#40E0D0',
        alignItems: "center",
        justifyContent: "center"
    },
    mainBodyItemText: {
        marginTop: 10
    },
    mainBodyItemImage: {
        width: 75,
        height: 75
    },
})

export default Main;