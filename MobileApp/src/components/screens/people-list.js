import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PeopleList from '../people/people-list'
import { inject, observer } from 'mobx-react'

@inject('people') @observer
class PeopleScreen extends Component {
    static navigationOptions = {
        title: 'People',
        headerLeft: null,
    }

    componentDidMount() {
        this.props.people.loadPeople()
    }

    render() {
        const { loading, people } = this.props.people
        return loading ? <Text>Loading...</Text> : <PeopleList people={people}/>
    }
}


const styles = StyleSheet.create({})

export default PeopleScreen
