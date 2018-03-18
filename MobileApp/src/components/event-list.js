import React, { Component } from 'react'
import {View, Text, ScrollView, StyleSheet, SectionList} from 'react-native'
import Card from './common/card'

class EventList extends Component {
    static propTypes = {
    };




    render() {
        let {events} = this.props
        events = events.sort((a,b) => a.title < b.title );
        let sections = {}
        events.forEach(item => {
            if (sections[item.title[0]])
                sections[item.title[0]].push(item)
            else
                sections[item.title[0]] = [item]
        } )

        sections = Object.entries(sections).map( ([key, value]) => ({data: value, key: key, title: `${key} (${value.length})` }));

        return (
            <SectionList
                renderItem={({item}) => <Card key = {item.uid}>
                                            <Text>{item.title}</Text>
                                        </Card>}
                renderSectionHeader={({section}) => <Text>{section.title}</Text>}
                keyExtractor={item => item.uid}
                sections={sections}
            />
        )
    }
}

const styles = StyleSheet.create({
})

export default EventList