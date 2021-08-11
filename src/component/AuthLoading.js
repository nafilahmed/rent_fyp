import React, {Component} from 'react';
import { View , ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as axios from 'react-native-axios';

export default class AuthLoading extends Component {
  constructor(props) {
      super(props);
      this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('user_id');

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  render() {
    return (
      <View>
        <ActivityIndicator size="small" color="#00ff00" />
      </View>
    );
  }
}




