import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image, Alert } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body } from 'native-base';
import { NavigationEvents } from '@react-navigation/native';
import { recipes } from '../data/dataArrays';
import styles from './styles';
// import MenuImage from '../../components/MenuImage/MenuImage';
import * as axios from 'react-native-axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.createTwoButtonAlert = this.createTwoButtonAlert.bind(this)
    this.state = {
      D_list: []
    }

    this.featching_promo_deals();
  }


  featching_promo_deals = async () => {

    try {
      axios.get('http://brandsmen.com.pk/rent_api/public/api/all_product', {
        // user_id:this.state.brand_user_id , offset : this.state.offset 
      }).then((brand_response) => {

        this.setState({
          D_list: brand_response.data,
        });

      })

    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.featching_promo_deals();
  }

  createTwoButtonAlert = (item) =>
    Alert.alert(
      "Update Product",
      "Do you want to update this product?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => { this.props.navigation.navigate('ProdDetail', { productDetails: item }) } }
      ]
    );

  renderRecipes = ({ item }) => (
    <TouchableHighlight onPress={() => {
      this.createTwoButtonAlert(item)
    }} underlayColor='rgba(73,182,77,1,0.9)' >
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: 'http://brandsmen.com.pk/rent_api/public' + item.feature_image }} />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.category}>Rs {item.price} / {item.unit}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    return (
      <View>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={this.state.D_list}
            renderItem={this.renderRecipes}
            keyExtractor={item => `${item.id}`}
          />
      </View>
    );
  }

}
