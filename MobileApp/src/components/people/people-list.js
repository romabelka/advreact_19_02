import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'

class PeopleList extends Component {
    render() {
        const { people } = this.props

        return <FlatList
            data={Object.keys(people).map(uid => ({ ...people[uid], key: uid }))}
            ItemSeparatorComponent={() => <Text/>}
            renderItem={({ item }) =>
                <View>
                    <Text>{`${item.firstName} ${item.lastName}`}</Text>
                    <Text>{`email: ${item.email}`}</Text>
                </View>}
        />
    }
}

const styles = StyleSheet.create({})

export default PeopleList
