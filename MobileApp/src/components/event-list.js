import React, { Component } from 'react'
import {View, Text, Button, ScrollView, StyleSheet, SectionList} from 'react-native'
import Card from './common/card'

const ListItem = (item) => {
    const {info : {uid, title, when, where, url}, currentEvent} = item
    let text = ''
    if(currentEvent == uid){
        text = `${title}\n${when}\n${where}\n${url}`
    }

    return (
        <Card key = {uid}>
            <View>
                <Button onPress={item.handleCheckEvent(uid)} title={title}/>
            </View>
            <View>
                <Text>{text}</Text>
            </View>
        </Card>
    )
}

const sectionsFormatting = (events) => {
    const eventsSorting = events.sort((a, b) => (
        a.title.localeCompare(b.title, 'en', {usage: 'sort', sensitivity: 'case'})
    ))

    let currentLetter = eventsSorting[0].title[0]
    let currentData = []
    const sections = []

    for (const event of eventsSorting) {
        const letter = event.title[0]

        if(currentLetter !== letter){
            sections.push({data: currentData, info: currentLetter, key: currentLetter})
            currentData = []
            currentLetter = letter
        }

        currentData.push(event)
    }
    return sections
}

class EventList extends Component {
    static propTypes = {

    };

    render() {
        return (
            <ScrollView>
                <SectionList
                    renderItem={({item}) => <ListItem
                                                info={item}
                                                handleCheckEvent={this.props.handleCheckEvent}
                                                currentEvent={this.props.currentEvent}
                                            />}
                    renderSectionHeader={({section}) => <Text>{`${section.info} (${section.data.length})`}</Text>}
                    sections={sectionsFormatting([...this.props.events])}
                    keyExtractor={(item) => item.uid}
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
})

export default EventList

