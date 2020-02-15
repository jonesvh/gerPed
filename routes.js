import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import Main from './src/screen/main'
import Order from './src/screen/orders'

//produto
import ProductList from './src/screen/product/productList'
import ProductItem from './src/screen/product/productItem'
import NewProduct from './src/screen/product/newProduct'

//categoria
import CategoryList from './src/screen/category/categoryList'
import NewCategory from './src/screen/category/newCategory'
import CategoryItem from './src/screen/category/categoryItem'

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen
                    name="Main"
                    component={Main}
                    options={{
                        headerStyle: {
                            backgroundColor: '#40E0D0'
                        },
                        headerTitle: 'Início'
                        //headerShown:false,
                    }}
                />
                <Stack.Screen
                    name="Order"
                    component={Order}
                    options={{
                        headerStyle: {
                            backgroundColor: '#40E0D0'
                        },
                        headerTitle: 'Pedidos'
                        //headerShown:false,
                    }}
                />
                <Stack.Screen
                    name="ProductList"
                    component={ProductList}
                    options={{
                        headerStyle: {
                            backgroundColor: '#40E0D0'
                        },
                        headerTitle: 'Lista de Produtos',
                        //headerShown:false,
                    }}
                />
                <Stack.Screen
                    name="ProductItem"
                    component={ProductItem}
                    options={
                        ({ route }) => ({
                            headerTitle: 'Dados do Produto',
                            headerStyle: {
                                backgroundColor: '#40E0D0'
                            }
                        })
                    }
                />
                <Stack.Screen
                    name="NewProduct"
                    component={NewProduct}
                    options={
                        ({ route }) => ({
                            headerTitle: 'Novo Produto',
                            headerStyle: {
                                backgroundColor: '#40E0D0'
                            }
                        })

                    }
                />

                <Stack.Screen
                    name="CategoryList"
                    component={CategoryList}
                    options={
                        ({ route }) => ({
                            headerTitle: 'Lista de Categorias',
                            headerStyle: {
                                backgroundColor: '#40E0D0'
                            }
                        })

                    }
                />
                <Stack.Screen
                    name="NewCategory"
                    component={NewCategory}
                    options={
                        ({ route }) => ({
                            headerTitle: 'Nova Categoria',
                            headerStyle: {
                                backgroundColor: '#40E0D0'
                            }
                        })

                    }
                />
                <Stack.Screen
                    name="CategoryItem"
                    component={CategoryItem}
                    options={
                        ({ route }) => ({
                            headerTitle: 'Dados da Categoria',
                            headerStyle: {
                                backgroundColor: '#40E0D0'
                            }
                        })

                    }
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;