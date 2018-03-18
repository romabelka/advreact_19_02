import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Modal } from 'react-native'

class PopupDelete extends Component {

    render() {
        return (
            <Modal
                animationType="fade"
                transparent={false}
                visible={this.props.visible}
                onRequestClose={() => {
                    this.props.onCancel()
                }}>
                <View style={styles.modalContainer}>
                    <View>
                        <Text>{this.props.message}</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                            <TouchableOpacity onPress={() => {
                                this.props.onCancel()
                            }}>
                                <Text style={styles.cancelButton}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                this.props.onDelete()
                            }}>
                                <Text style={styles.deleteButton}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteButton: {
        padding: 5,
        width: 100,
        borderWidth: 1,
        color: 'white',
        backgroundColor: 'red',
        textAlign: 'center',
    },
    cancelButton: {
        padding: 5,
        width: 100,
        borderWidth: 1,
        backgroundColor: '#e3e3e3',
        textAlign: 'center',
    },
})

export default PopupDelete
