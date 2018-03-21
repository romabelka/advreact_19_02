import React, { Component } from 'react'
import {View, ProgressBarAndroid} from 'react-native'

class Loading extends Component {
    render() {
        return (
            <View>
                <ProgressBarAndroid />
            </View>
        )
    }
}

export default Loading