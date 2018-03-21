import React, { Component } from 'react'
import {View, Text, TextInput, TouchableOpacity, Platform} from 'react-native'
import {observer, inject} from 'mobx-react'

@inject('auth') @observer
class SignIn extends Component {
    render() {
        const {auth} = this.props
        return (
            <View style = {styles.container}>
                <Text>Please Sign In:</Text>
                <View>
                    <Text>Email:</Text>
                    <TextInput
                        value = {auth.email}
                        style = {styles.input}
                        onChangeText = {auth.setEmail}
                        keyboardType = 'email-address'
                    />
                </View>
                <View>
                    <Text>Password:</Text>
                    <TextInput
                        value = {auth.password}
                        style = {styles.input}
                        onChangeText = {auth.setPassword}
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity onPress = {this.props.auth.signIn}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    input: {
        ...Platform.select({
            ios: {
                borderBottomWidth: 1
            },
            android: {

            }
        })
    }
}

export default SignIn