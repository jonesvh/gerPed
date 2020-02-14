import * as React from 'react';

import { View, Text, StyleSheet, FlatList, Alert, Dimensions, Image, ActivityIndicator } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';

// import { Container } from './styles';

const baseURL = 'https://api.github.com';
const perPage = 10;
const initSearchTerm = ''

const { width } = Dimensions.get('window')
const widthScreen = (width - 125)

//export default class ProductList extends React.Component {

const ProductList = ({ navigation }) => {

    const [data, setData] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState(initSearchTerm);

    loadRepositories = async () => {

        try {
            if (loading) return;

            setLoading(true)

            const response = await fetch(`${baseURL}/search/repositories?q=${searchTerm}&per_page=${perPage}&page=${page}`);
            const repositories = await response.json();
            //console.log(repositories)
            setData(repositories.items)
            setPage(page)
            setLoading(false)
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
            <Image
                style={styles.listItemImage}
                source={{ uri: item.owner.avatar_url }}
            ></Image>
            <Text>{item.name}</Text>
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

    /*React.useEffect(()=>{
        loadRepositories()
    },[])*/

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
            <View>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    numColumns={onLayout()}
                    onEndReached={loadRepositories}
                    onEndReachedThreshold={0.3} //carrega mais quando faltar 10% para o fim da pagina
                    ListFooterComponent={renderFooter}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    list: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
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
        marginBottom: 20
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
    }
});

export default ProductList;