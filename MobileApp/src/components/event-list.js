import React, { Component } from 'react'
import {View, Text, ScrollView, StyleSheet, SectionList} from 'react-native'
import Card from './common/card'

class EventList extends Component {
    static propTypes = {

    };

    render() {
        const sortedEvents = [...this.props.events]
           .sort((a,b) => a.title.localeCompare(b.title, 'ru', {usage: 'search', sensitivity: 'base'}))
        
        let currentLetter = sortedEvents[0].title[0]
        let currentData = []
        const sections = []
        
        for (const event of sortedEvents) {
            const letter = event.title[0]
            if(currentLetter !== letter){
                sections.push({data: currentData, title: currentLetter, key: currentLetter})
                currentData = []
                currentLetter = letter
            }

            currentData.push(event)
        }

        sections.push({data: currentData, title: currentLetter, key: currentLetter})

        return (
            <View>
                <SectionList
                    renderItem={({item}) => (
                        <Card>
                            <Text>{item.title}</Text>
                        </Card>
                    )}
                    renderSectionHeader={({section}) => <Text>{section.title}</Text>}
                    sections={sections}
                    stickySectionHeadersEnabled={true}
                    keyExtractor={(item) => item.uid}
                />                    
            </View>
        )
    }
}

const styles = StyleSheet.create({
})

export default EventList