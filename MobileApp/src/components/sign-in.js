import React, { Component } from 'react'
import {View, Text, TextInput, TouchableOpacity, Platform} from 'react-native'
import {observer} from 'mobx-react'
import {observable, computed, action} from 'mobx'

@observer
class SignIn extends Component {
    @observable email = ''
    @observable password = ''
    @computed get summary() {
        return this.email + this.password.length
    }

    render() {
        return (
            <View style = {styles.container}>
                <Text>Summary: {this.summary}</Text>
                <Text>Please Sign In:</Text>
                <View>
                    <Text>Email:</Text>
                    <TextInput
                        value = {this.email}
                        style = {styles.input}
                        onChangeText = {this.handleEmailChange}
                        keyboardType = 'email-address'
                    />
                </View>
                <View>
                    <Text>Password:</Text>
                    <TextInput
                        value = {this.password}
                        style = {styles.input}
                        onChangeText = {this.handlePasswordChange}
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity onPress = {this.handleSubmit}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }

    @action handleEmailChange = email => this.email = email
    @action handlePasswordChange = password => this.password = password

    handleSubmit = () => {
        this.props.navigation.navigate('eventList')
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