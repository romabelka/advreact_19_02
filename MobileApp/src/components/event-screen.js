import React, { Component } from 'react'
import {View, Text, TouchableOpacity, Button, Modal, StyleSheet} from 'react-native'

class EventScreen extends Component {
	state = {
		infoShown: false,
		modalVisible: false
	}

	toggleInfo = () => {
		this.setState({ infoShown: !this.state.infoShown })
	}

	toggleModal = () => {
		this.setState({ modalVisible: !this.state.modalVisible })
	}

	render() {
		const { event } = this.props
		const { infoShown, modalVisible } = this.state

		return (
			<View>
				<TouchableOpacity onPress={this.toggleInfo}>
					<Text>{event.title}</Text>
				</TouchableOpacity>
				{infoShown &&
					<View>
						<Text>
							Site: { event.url }
						</Text>
						<Text>
							Where: { event.where }
						</Text>
						<Text>
							When: { event.when }
						</Text>
					</View>
				}

				<Button title="Delete" color="#841584" onPress={this.toggleModal}/>

				<Modal
					animationType="slide"
					transparent={false}
					visible={modalVisible}
				>
					<View style={styles.modal} >
						<Text>Do you really want to delete it?</Text>
						<Button title="Yep" color="lime" onPress={this.toggleModal} />
						<Button title="Nope" color="brown" onPress={this.toggleModal} />
					</View>
				</Modal>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	modal: {
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default EventScreen