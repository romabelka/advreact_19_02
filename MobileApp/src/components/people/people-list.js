import React, { Component } from 'react'
import {Text, FlatList} from 'react-native'

class PeopleList extends Component {

    render() {
        const {peopleList} = this.props
        return <FlatList
                data = {Object.keys(peopleList).map(uid => ({uid, ...peopleList[uid]}))}
                renderItem = { ({item}) => <Text>{item.lastName} {item.firstName}</Text> }
        />
    }

}


export default PeopleList