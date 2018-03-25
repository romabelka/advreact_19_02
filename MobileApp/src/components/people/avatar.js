import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import {observable, action} from 'mobx'
import {observer, inject} from 'mobx-react'
import TakeAvatarFromCamera from './take-avatar-from-camera'

@inject("photo")
@observer
export default class Avatar extends Component {
    @observable takeAvatar = false
    @observable URI = 'http://lorempixel.com/200/100/people/'

    @action setTakeAvatar(value){
        this.takeAvatar = value === true
    }

    //@action
    async componentDidMount() {
        try{
            const uri = await this.props.photo.getPhotosUri(this.props.personUid)
            this.setUri(uri)
        } catch(e) {
            console.error(e)
        }
    }

    @action setUri(uri){
        this.URI = uri
    }

    render() {
        const uri = this.URI
        if(this.takeAvatar){
            return <TakeAvatarFromCamera uid={this.props.personUid} onClose={() => this.setTakeAvatar(false)}/>
        }

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.showChangeAvatarConfirm}>
                    <Image
                        source={{uri}}
                        style = {styles.avatar}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    showChangeAvatarConfirm = () => {
        const changeOrAdd = 'change'

        Alert.alert(
          "Change Avatar",
          `Do You whant to ${changeOrAdd} avatar?`,
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Open camera",
              onPress: () => this.setTakeAvatar(true)
            }
          ],
          { cancelable: true }
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center'
    },
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 100,
        margin: 5
    }
})