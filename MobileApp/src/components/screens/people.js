import React, { Component } from 'react'
import {StyleSheet, View, Text} from 'react-native'

class PeopleScreen extends Component {
    static propTypes = {

    };

    static navigationOptions = {
        title: 'People List',
        headerLeft: null
    }

    render() {
        return (
            <View>
                <Text>People</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
})

export default PeopleScreen