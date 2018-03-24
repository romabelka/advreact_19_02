import React, { Component } from 'react'
import {Text, StyleSheet} from 'react-native'
import {MapView, Location, Permissions} from 'expo'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'

@observer
class EventMap extends Component {
    @observable permissionAsked = false
    @observable permissionGranted = false
    @observable coords = null

    @action async componentDidMount() {
        this.setAsked()
        const {status} = await Permissions.askAsync(Permissions.LOCATION)
        this.setGranted(status === 'granted')
        this.setCoords(await Location.getCurrentPositionAsync())
    }

    @action setAsked() {
        this.permissionAsked = true
    }

    @action setGranted(granted) {
        this.permissionGranted = granted
    }

    @action setCoords({ coords }) {
        this.coords = coords
    }

    render() {
        if (!this.permissionAsked) return <Text>Not asked</Text>
        if (!this.permissionGranted) return <Text>Not granted</Text>
        if (!this.coords) return <Text>Not coords yet</Text>

        return (
            <MapView
                style = {{ flex: 1 }}
                initialRegion={{
                    ...this.coords,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <MapView.Marker coordinate = {this.coords} title = 'my position'/>
            </MapView>
        )
    }
}

const styles = StyleSheet.create({
})

export default EventMap