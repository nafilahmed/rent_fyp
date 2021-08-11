import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/Home';
import UpdateProductScreen from '../screens/UpdateProduct';
import AddProductScreen from '../screens/AddProduct';
import MyAddScreen from '../screens/MyAdds';
import ProdDetailScreen from '../screens/ProdDetail';

function CustomDrawer({ navigation }) {

    const Drawer = createDrawerNavigator();

    const drawerItems = [
        {
            screen: "Homes",
            title: "Home",
            route: "Homes"
        },
        {
            screen: "Add Product",
            title: "Add Product",
            route: "AddProduct"
        },
        {
            screen: "My Adds",
            title: "My Adds",
            route: "MyProduct"
        },
        {
            screen: "Logout",
            title: "Logout",
            route: "Logout"
        }
    ]

    function renderDrawerContent() {

        return (
            <View style={{ flex: 1 }}>
                <>
                    < View style={{ paddingTop: 10, alignItems: 'center', }}>

                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', marginTop: 20, }}>
                            Demo Name
                        </Text>
                    </View>

                    <View >
                        {drawerItems.map(item => itemsLayout(item))}
                    </View>
                </>

            </View >
        )
    }

    function itemsLayout(item) {
        return <TouchableOpacity
            onPress={() => {
                if (item.route == "logout") {
                    createLogoutDialog();
                }else{
                    navigation.navigate(item.route);
                }
            }}
        >
            <Text style={{ color: "black", fontSize: 20,padding:10 }}>{item.title} </Text>
            
        </TouchableOpacity>
    }

    function createLogoutDialog() {
        Alert.alert('Log out',
            'Do you want to logout?',
            [
                {
                    text: 'No', onPress: async () => {
                    }, style: 'cancel'
                },
                {
                    text: 'Yes', onPress: async () => {

                        // if (user.userDetails != undefined) {
                        //     let fcmObject = {
                        //         Id: user.userDetails.id,
                        //         fcmToken: ''
                        //     }
                        //     createApiCall(apiConstants.methods.PUT, apiConstants.endPoints.registerUser, fcmObject).then((response) => {
                        //         if (response.status == 200 && response.data.responseCode == apiConstants.responseCode.success) {
                        //             console.log('working', response.data);
                        //         }
                        //     })
                        // }
                    }
                },
            ],
            false
        )
    }

    return <Drawer.Navigator initialRouteName={HomeScreen}
        drawerType="slide"
        drawerPosition="left"
        drawerContent={() => renderDrawerContent()}
    >
        <Drawer.Screen name="Homes" component={HomeScreen} />
        <Drawer.Screen name="Update Product" component={UpdateProductScreen} />
        <Drawer.Screen name="AddProduct" component={AddProductScreen} />
        <Drawer.Screen name="MyProduct" component={MyAddScreen} />
        <Drawer.Screen name="ProdDetail" component={ProdDetailScreen} />

    </Drawer.Navigator>
}

export default CustomDrawer;