import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import PeopleList from '../people/people-list'
import Loader from '../common/loader'
import {inject, observer} from 'mobx-react'


@inject('people') @observer
class PeopleListScreen extends Component {
    static propTypes = {

    };

    componentDidMount()
    {
        this.props.people.fetchAll()
    }

    static navigationOptions = {
        title: 'People List'
    }

    render() {
        const {loading, peopleList} = this.props.people
        return loading ? <Loader /> :  <PeopleList  peopleList = {peopleList}/>
    }
}

const styles = StyleSheet.create({
})

export default PeopleListScreen