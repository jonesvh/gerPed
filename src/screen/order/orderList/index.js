import * as React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList, Alert, Dimensions, Image, ActivityIndicator } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';

const baseURL = 'http://pedidos-test.herokuapp.com/api/pedido'
const perPage = 7;
const initSearchTerm = ''

const { width } = Dimensions.get('window')
const widthScreen = (width - 125)

const OrderList = ({ navigation }) => {

    const [data, setData] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState(initSearchTerm);

    let aux;
    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            loadRepositories()
            return () => {
            };
        }, [])
    );

    loadRepositories = async () => {

        try {
            if (loading) return;

            setLoading(true)

            aux = baseURL + `?page=1&limit=5&dataInicial=1750-01-01T00%3A00%3A00`

            const response = await fetch(aux, {
                method: 'get'
            });
            const repositories = await response.json();
            setData(repositories.docs)
            setPage(page)
            setLoading(false)
            console.log(data)
        } catch (error) {0
            Alert.alert(error.toString())
        }
    }

    renderItem = ({ item }) => (

        <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
                navigation.navigate('CategoryItem', { item: item })
            }}
        >
            <Text style={styles.orderText1}>{item.mesa.descricao}</Text>
            {item.pago?<Text style={styles.orderText2}>Pago</Text>:<Text style={styles.orderText2}>Em aberto</Text>}
            <Text style={styles.orderText3}>Cliente: {item.cliente.nome}</Text>
            <Text style={styles.orderText4}>Atendente: {item.garcom.usuario}</Text>
            <Text style={styles.orderText5}>{item.data}</Text>
        </TouchableOpacity>
    );

    onLayout = () => {
        const { width } = Dimensions.get('window')
        const itemWidth = 300
        const numColumns = Math.floor(width / itemWidth)
        return numColumns
    }

    renderFooter = () => {
        if (loading) {

            return (
                <View style={styles.loading}>
                    <ActivityIndicator></ActivityIndicator>
                    <Text>Carregando mais categorias</Text>
                </View>
            )
        } else {
            if (data.length == 0 && searchTerm.length != 0) {
                return (
                    <View style={styles.loading}>
                        <Text>Nenhuma categoria encontrado</Text>
                    </View>
                )
            } else {
                return (
                    <View style={styles.loading}>
                        <Text>Procure por uma categoria</Text>
                    </View>
                )
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <TextInput
                    style={styles.searchInput}
                    placeholder={'Digite o nome de uma categoria...'}
                    onChangeText={(text) => {
                        if (!text == '') {
                            setSearchTerm(text)
                        } else {
                            setSearchTerm(initSearchTerm)
                        }
                    }}
                ></TextInput>
                <TouchableOpacity style={styles.searchButton}
                    onPress={() => {
                        loadRepositories()
                    }}
                >
                    <Text style={styles.mainHeaderText}>Buscar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerList}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    numColumns={onLayout()}
                    onEndReached={loadRepositories}
                    onEndReachedThreshold={0.3} //carrega mais quando faltar 10% para o fim da pagina
                //ListFooterComponent={renderFooter}
                />
            </View>
            <View style={styles.addView}>
                <TouchableOpacity
                    style={styles.add}
                    onPress={() => {
                        navigation.navigate('NewCategory')
                    }}
                >
                    <Text style={{ color: '#fff', fontWeight: "bold", fontSize: 30 }}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerList:{
        flex:2
    },
    list: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    listItem: {
        backgroundColor: '#fff',
        width: 300,
        height: 120,
        margin: 15,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#40E0D0',
        alignItems: 'center',
        justifyContent: "center"
    },
    orderText1:{
        fontSize:24,
        fontWeight:'bold',
        bottom:10
    },
    orderText2:{
        fontSize:15,
        bottom:12
    },
    orderText3:{
        fontSize:15,
        fontWeight:'bold',
        bottom:5
    },
    orderText4:{
        fontSize:15,
        fontWeight:'bold',
    },
    orderText5:{
        fontSize:10,
        fontWeight:'bold',
        top:5
    },
    loading: {
        alignSelf: 'center',
        marginVertical: 20,
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#40E0D0',
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
    },
    searchInput: {
        backgroundColor: '#fff',
        width: widthScreen,
        height: 40,
        paddingLeft: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#40E0D0'
    },
    searchButton: {
        backgroundColor: '#fff',
        width: 100,
        height: 40,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    addView: {
        position: 'absolute',
        width: 85,
        height: 85,
        borderRadius: 42.5,
        right: 20,
        bottom: 20,
        backgroundColor: '#40E0D0',
        borderWidth: 3,
        borderColor: '#fff',
        alignItems: "center",
        justifyContent: "center"
    },
    add: {
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center"
    },
});

export default OrderList;