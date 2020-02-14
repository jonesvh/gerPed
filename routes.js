import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import Main from './src/screen/main'
import Order from './src/screen/orders'
import ProductList from './src/screen/product/productList'
import Product from './src/screen/product/productItem'
import NewProduct from './src/screen/product/newProduct'

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
                    name="Product"
                    component={Product}
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
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;