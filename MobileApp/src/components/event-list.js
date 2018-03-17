import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, SectionList } from 'react-native'
import Card from './common/card'

class EventList extends Component {
    static propTypes = {

    };

    render() {
        const groupedEvents = this.groupEventsByFirstLetter()
        return (
            <ScrollView>
                <SectionList
                    renderItem={({ item }) => <Card><Text>{item.title}</Text></Card>}
                    renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
                    keyExtractor={item => item.uid}
                    sections={
                        groupedEvents.map(({ groupData, groupName }) => ({
                            data: groupData,
                            title: `${groupName} [${groupData.length}]`,
                        }))
                    }
                />
            </ScrollView>
        )
    }


    groupEventsByFirstLetter() {
        return this.props.events
            .sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
            .reduce(
                (acc, event) => {
                    const firstLetter = event.title[0]
                    if (acc.length) {
                        const lastGroup = acc[acc.length - 1]
                        if (lastGroup.groupName.toLowerCase() === firstLetter.toLowerCase()) {
                            lastGroup.groupData.push(event)
                            return acc
                        }
                    }

                    acc.push({ groupName: firstLetter, groupData: [event] })

                    return acc
                }, [])
    }
}

const styles = StyleSheet.create({
})

export default EventList
