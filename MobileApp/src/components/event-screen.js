import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import PopupDelete from './common/popup-delete'

class EventScreen extends Component {
    state = {
        modalVisible: false,
    }

    render() {
        const { event } = this.props
        return (
            <View>
                <Text style={styles.title}>{event.title}</Text>

                <Text>{event.url}</Text>

                <Text>
                    <Text style={styles.fieldName}>Date: </Text>
                    <Text>{event.when}</Text>
                </Text>

                <Text>
                    <Text style={styles.fieldName}>Place: </Text>
                    <Text>{event.where}</Text>
                </Text>

                <TouchableOpacity onPress={this.handlePress}>
                    <Text style={styles.deleteButton}>DELETE</Text>
                </TouchableOpacity>

                <PopupDelete
                    visible = {this.state.modalVisible}
                    message = {`Are you sure you want to delete this event?\n${event.title}`}
                    onCancel = {this.hidePopup}
                    onDelete = {this.deleteEvent}
                />
            </View>
        )
    }

    hidePopup = () => {
        this.setState({ modalVisible: false })
    }

    handlePress = () => {
        this.setState({ modalVisible: true })
    }

    deleteEvent = () => {
        this.setState({ modalVisible: false })
        console.log('-->', 'Delete', this.props.event.uid)
    }
}

const styles = StyleSheet.create({
    title: {
        color: 'blue',
        fontWeight: 'bold',
    },
    fieldName: {
        fontWeight: 'bold',
    },
    deleteButton: {
        padding: 5,
        borderWidth: 1,
        color: 'white',
        backgroundColor: 'red',
        textAlign: 'center',
    },
})


export default EventScreen
