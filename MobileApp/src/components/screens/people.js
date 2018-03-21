import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import {observer, inject} from 'mobx-react'
import Loading from "../common/loading";

@inject('people') @observer
export default class People extends Component {
    componentDidMount(){
        this.props.people.getPeople();
    }

    render() {
        const {people} = this.props
        if(people.loading){
            return <Loading />
        }

        const peopleCards = people.peopleMapped
            .map(person => (
                <View key={person.uid}>
                    <Text style={styles.titleText}>{`${person.firstName} - ${person.lastName}`}</Text>
                    <Text>{person.email}</Text>
                </View>
            ))

        return (
            <ScrollView>
                <Text>Persons:</Text>
                {peopleCards}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});