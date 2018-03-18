import React, { Component } from 'react'
import {View, Text, ScrollView, StyleSheet} from 'react-native'
import EventList from './event-list'

class SectionList extends Component {
	render() {
		const { sections } = this.props
		console.log(sections)
		return (
			<ScrollView>
				{Object.keys(sections).map(k => (
					<View key={k}>
						<Text>
							{k.toUpperCase()}
							({sections[k].length} events)
						</Text>
						<EventList events={sections[k]} />
					</View>
				))}
			</ScrollView>
		)
	}
}

export default SectionList