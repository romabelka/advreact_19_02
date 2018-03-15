import React from 'react'
import { StyleSheet, View } from 'react-native'
//import HelloWorld from './src/components/hello-world'
//import SignIn from './src/components/sign-in'
import EventList from './src/components/event-list'
import {eventList} from './src/fixtures'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <EventList events = {eventList} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
