import React, { Component } from 'react'
import {View, StyleSheet, Text, Button, Alert } from 'react-native'
import Card from './common/card'

class EventScreen extends Component {
    static propTypes = {
    };


    _deleteConfirmation = () =>
    {
        Alert.alert(
            'Confirm',
            'Do you really want to delete item?',
            [
                {text: 'Yes', onPress: () => console.log('item removed')},
                {text: 'No', onPress: () => console.log('item NOT removed'), style: 'cancel'},
            ]
        )
    }

    render() {
        const {event} = this.props
        return (
        <View style={styles.main}>
            <View>
                <Text style={styles.header} >{event.title}</Text>
                <Text style={[styles.link, styles.text]}>{event.url}</Text>
                <Text style={styles.text}>{event.where}</Text>
                <Text style={styles.text}>{event.when}</Text>
            </View>
            <Button
                title="Delete"
                onPress={this._deleteConfirmation}
            />
        </View>

        )
    }
}

const styles = StyleSheet.create({
    main: {
        height: '70%',
        justifyContent: 'space-between'
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold'

    },
    text: {
        fontSize: 15
    },
    link: {
        color: 'blue'
    }
})

export default EventScreen