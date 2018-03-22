import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';

import EventListScreen from './event-list'
import PeopleListScreen from './people-list'

export default TabNavigator({
    People: { screen: PeopleListScreen },
    Events: { screen: EventListScreen },
});