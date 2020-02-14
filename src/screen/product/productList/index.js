import * as React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList, Alert, Dimensions, Image, ActivityIndicator } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';

const baseURL = 'http://pedidos-test.herokuapp.com/api/item'
const perPage = 7;
const initSearchTerm = ''

const { width } = Dimensions.get('window')
const widthScreen = (width - 125)

const ProductList = ({ route, navigation }) => {

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

        console.log('1')

        try {
            if (loading) return;

            setLoading(true)

            if(searchTerm){
                aux = baseURL + `?page=${page}&limit=${perPage}&descricao=${searchTerm}`
            }else{
                aux = baseURL + `?page=${page}&limit=${perPage}&descricao`
            }

            const response = await fetch(aux, {
                method: 'get'
            });
            const repositories = await response.json();
            setData(repositories.docs)
            setPage(page )
            setLoading(false)
        } catch (error) {0
            Alert.alert(error.toString())
        }
    }

    addItem = async () => {

        try {
            const response = await fetch(baseURL, {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    descricao: 'Testaoooo',
                    valor: 10
                }),
            });
        } catch (error) {
            Alert.alert(error.toString())
        }
    }

    renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
                navigation.navigate('Product', { item: item })
            }}
        >
            <Text>{item.descricao}</Text>
            <Text>{item.valor}</Text>
        </TouchableOpacity>
    );

    onLayout = () => {
        const { width } = Dimensions.get('window')
        const itemWidth = 150
        const numColumns = Math.floor(width / itemWidth)
        return numColumns
    }

    renderFooter = () => {
        if (loading) {

            return (
                <View style={styles.loading}>
                    <ActivityIndicator></ActivityIndicator>
                    <Text>Carregando mais produtos</Text>
                </View>
            )
        } else {
            if (data.length == 0 && searchTerm.length != 0) {
                return (
                    <View style={styles.loading}>
                        <Text>Nenhum produto encontrado</Text>
                    </View>
                )
            } else {
                return (
                    <View style={styles.loading}>
                        <Text>Procure por um produto</Text>
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
                    placeholder={'Digite o nome de um produto...'}
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
                        navigation.navigate('NewProduct')
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
        width: 150,
        height: 200,
        margin: 15,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#40E0D0',
        alignItems: 'center',
        justifyContent: "center"
    },
    listItemImage: {
        width: 100,
        height: 150,
        borderRadius: 50,
        borderWidth: 0.5,
        borderColor: '#111',
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

export default ProductList;