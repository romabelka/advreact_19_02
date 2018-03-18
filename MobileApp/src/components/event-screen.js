import React, {Component} from 'react'
import {View, Text, Button, Alert} from 'react-native'

class EventScreen extends Component {
    
    render() {
        const {event} = this.props

        return (
            <View>
                <Text>Event: {event.title}</Text>
                <Text>{event.where} - {event.when}</Text>
                <Button
                    onPress={this.onRemovePress}
                    title="X"
                    color="#DC143C"
                    accessibilityLabel={`Remove event ${event.title}`}
                />
            </View>
        )
    }

    onRemovePress = () => {
        Alert.alert(
            'REMOVE EVENT?',
            `Event '${this.props.event.title}' will be completely removed`,
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'REMOVE', onPress: () => console.log('REMOVE Pressed'), style: 'destructive'},
            ],
            { cancelable: false }
          )
        
    }
}

export default EventScreen;