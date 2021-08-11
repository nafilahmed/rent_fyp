import React from 'react';
import * as axios from 'react-native-axios';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Image, Alert, ToastAndroid } from 'react-native';

class Register extends React.Component {

    constructor() {
        super()
        this.registerUser = this.registerUser.bind(this)
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            address: '',
            phone: '',
        }
    }

    async registerUser() {

        if (this.state.name != "" && this.state.email != "" && this.state.password != ""
            && this.state.confirmPassword != ""
            && this.state.password == this.state.confirmPassword
        ) {

            const data = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                phone_num: this.state.phone,
                address: this.state.address,
                confirmPassword: this.state.confirmPassword
            }

            console.log(data)

            let response = await axios.post('http://brandsmen.com.pk/rent_api/public/api/register',data)
            console.log(response)

        }
        else if (this.state.password == this.state.confirmPassword) {
            ToastAndroid.show('Password and confirm password fields should have same password', ToastAndroid.LONG)
        }
        else {
            ToastAndroid.show('All fields are mandatory!', ToastAndroid.LONG)

        }

    }


    render() {
        return <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
                <TextInput style={styles.inputs}
                    placeholder="Name"
                    keyboardType="default"
                    underlineColorAndroid='transparent'
                    onChangeText={(name) => this.setState({ name })}
                    value={this.state.name}
                />
            </View>

            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
                <TextInput style={styles.inputs}
                    placeholder="Email Address"
                    underlineColorAndroid='transparent'
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                />
            </View>

            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
                <TextInput style={styles.inputs}
                    placeholder="Password"
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                />
            </View>

            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
                <TextInput style={styles.inputs}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                    value={this.state.confirmPassword}
                />
            </View>

            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
                <TextInput style={styles.inputs}
                    placeholder="Address"
                    keyboardType="default"
                    underlineColorAndroid='transparent'
                    onChangeText={(address) => this.setState({ address })}
                    value={this.state.address}
                />
            </View>

            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
                <TextInput style={styles.inputs}
                    placeholder="Phone Number"
                    keyboardType="default"
                    underlineColorAndroid='transparent'
                    onChangeText={(phone) => this.setState({ phone })}
                    value={this.state.phone}
                />
            </View>

            <TouchableHighlight style={styles.buttonContainer} onPress={() => this.registerUser()}>
                <Text style={styles.loginText}>Register</Text>
            </TouchableHighlight>
        </View>
    }

}

export default Register;

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
        backgroundColor: 'blue'
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    }
});