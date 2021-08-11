import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as axios from 'react-native-axios';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // text_input_email: "batman@gmail.com",
      // text_input_password: "12345",
      // text_input_email: "",
      // text_input_password:"",
      login_error: '',
      login_loader: false,
      isVisible: false,
      pass_email: "",
      pass_success: false,
      pass_error: false,
      email_loader: false,
      fail_email_send: 'Enter correct e-mail',
      valid_email_error: false,
    }
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  loginCustom = () => {

    var self = this;

    try {

      if (!this.validateEmail(this.state.text_input_email)) {
        this.setState({ login_error: 'Invalid email' });
      } else {

        axios.interceptors.request.use(function (config) {
          // Do something before request is sent
          console.log('Start Ajax Call');

          self.setState({ login_loader: true });
          return config;
        }, function (error) {
          // Do something with request error
          console.log('Error');
          self.setState({ login_loader: false });
          return Promise.reject(error);
        });

        axios.interceptors.response.use(function (response) {
          self.setState({ login_loader: false });
          // Do something with response data
          console.log('Done with Ajax call');

          return response;
        }, function (error) {
          // Do something with response error
          console.log('Error fetching the data' + error);
          return Promise.reject(error);
        });

        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNTk0NmM4YmRkYjQ2OGQxMGI3MzUzYjYxZDNjNGExMmI0ZmQ5YjM4YjIxZmUzMTMzNzAzMWJkYjk1ZTRhZGQ3OGQyYzZiZDQ4MzFlMGM1NzMiLCJpYXQiOjE1NzY0MzA4MTEsIm5iZiI6MTU3NjQzMDgxMSwiZXhwIjoxNjA4MDUzMjExLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.VLFMVl0SOADe4PmZvaar3pu7ZIRw1kteehG7aIgqaPtn9Ffbu-ePC4mS1u5zpSo2_432Tx4D4WFQzGGOja3vjxMNIRZJbSpnuaSdMvkOT0fFdm4eJcyJev2BvIWwGt8e1CAse8noTgf325Y7OijApMLLhmymt3MAQfbrCXFY5MrqRmP1QflHedZ487l-Al2_NZKxoin4wNjDixQ98sCfLxR8RzGofXmJJQl5lhBVnF1qaZsb48TUBztBxljD7_ggr4p6nnD2KkGPWoEnjBJacAZMuW7eaj6MDFrQBAq_3QKh43AvbIGodyvMhQgZyrwdltfeeTaFiBAZlBzeHvWmzqsxarSYRhgTe1oDBfecRzlHejAmGrMxfZ7O6EklYaVI4vwW1x8eYMv4Oxh-7qSiCw_10CkWJsjgLAE2YYXlGA6RRnSZ9lVSXOajPFmzazLMdBTcYFymmNynYP3FTSbUNOqq_3vqt1x8WPD91H36Kjc2VH8l42lB8zeXeytIUMQ-9-22tD4S5x5UBL9qw7I1QXrlks4Q7wbJ2yHrCpbGnK8m3xImg6BsSaKKCBMyIXbkUTn2tKNMBjwQGhhqDQrzzDGzyyVvrtUMLkc2KEUl6RkdQBRgzbysBOFfHVX8s83VGn4va-hygwnvVVYb9bcDTApkyPjkE9eHaKE2CnShdoc'
        }

        axios.post('http://brandsmen.com.pk/rent_api/public/api/login', {
          email: this.state.text_input_email,
          password: this.state.text_input_password
        }).then(function (response) {

          var myObj = response.data;
          // console.log(response.data);

          if (myObj.hasOwnProperty('success')) {
            const user_id = ["user_id", JSON.stringify(myObj.user.id)];
            const user_name = ["user_name", myObj.user.name];
            AsyncStorage.multiSet([user_id, user_name]).then(() => {
              
              this.props.navigation.navigate('Home');
            });

          } else {
            self.setState({ login_error: "Invalid email / password.", login_loader: false });
            Alert.alert("Alert", "Else Invalid email / password.");
          }

        }.bind(this)).catch(function (error) {
          console.log(error);
          Alert.alert("Alert", "Invalid email / password.");
        }.bind(this));

      }
    } catch (error) {
      this.setState({ login_loader: false });
      alert('Login failed with error: ' + error)
    }
  }

  login_form = () => {
    return (
      <View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
          <TextInput style={styles.inputs} placeholder="Email" keyboardType="email-address" underlineColorAndroid='transparent' onChangeText={(text_input_email) => this.setState({ text_input_email })} value={this.state.text_input_email} />
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
          <TextInput style={styles.inputs} placeholder="Password" secureTextEntry={true} underlineColorAndroid='transparent' onChangeText={(text_input_password) => this.setState({ text_input_password })} value={this.state.text_input_password} />
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.loginCustom()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Register')}>
          <Text>Register</Text>
        </TouchableHighlight>
      </View>
    )
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed " + viewId);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.login_form()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});