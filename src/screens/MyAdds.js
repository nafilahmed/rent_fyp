import React, { useState } from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image, Alert } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body } from 'native-base';
import { NavigationEvents } from '@react-navigation/native';
import { recipes } from '../data/dataArrays';
import styles from './styles';
// import MenuImage from '../../components/MenuImage/MenuImage';
import * as axios from 'react-native-axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

// export default class Home extends React.Component {

const Home = ({ route, navigation }) => {

  const [D_list, set_D_list] = useState([]);

  React.useEffect(
    () => navigation.addListener('focus', async () => {

      const userId = await AsyncStorage.getItem("user_id");
      console.log(userId);
      try {
        axios.get('http://brandsmen.com.pk/rent_api/public/api/my_product/'+userId, {
          // user_id:this.brand_user_id , offset : this.offset 
        }).then((brand_response) => {
          set_D_list(brand_response.data);
        })

      } catch (err) {
        console.log(err);
      }

    }),
    []
  );
  
  
  const createTwoButtonAlert = (item) => {
    
    Alert.alert(
      "Update Product",
      "Do you want to update this product?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => { navigation.navigate('Update Product', { productDetails: item }) } }
      ]
    );
  }

  const renderRecipes = ({ item }) => (
    <TouchableHighlight onPress={() => {
      createTwoButtonAlert(item)
    }} underlayColor='rgba(73,182,77,1,0.9)' >
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: 'http://brandsmen.com.pk/rent_api/public' + item.feature_image }} />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.category}>Rs {item.price} / {item.unit}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={D_list}
          renderItem={renderRecipes}
          keyExtractor={item => `${item.id}`}
        />
    </View>
  );
}

export default Home;