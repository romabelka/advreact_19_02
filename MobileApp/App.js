import React from 'react'
import {StyleSheet, View, Image} from 'react-native'
//import HelloWorld from './src/components/hello-world'
//import SignIn from './src/components/sign-in'
import EventList from './src/components/event-list'
import {eventList} from './src/fixtures'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentEvent: null};
        this.onCheckEvent = this.onCheckEvent.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('./assets/images/logo.png')}
                       style={styles.image}
                       resizeMode = {Image.resizeMode.contain}/>
                <EventList
                    events={eventList}
                    handleCheckEvent={this.onCheckEvent}
                    currentEvent={this.state.currentEvent}
                />
            </View>
        );
    }

    onCheckEvent = (id) => () => {
        this.setState({currentEvent : id})
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: 100
    }
});
