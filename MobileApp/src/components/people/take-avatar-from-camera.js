import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Vibration,
  Modal,
  ActivityIndicator
} from "react-native";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import { Camera, Permissions, Brightness } from "expo";
import firebase from 'firebase'

@inject("photo")
@observer
export default class TakeAvatarFromCamera extends Component {
  @observable permissionAsked = false
  @observable permissionGranted = false
  @observable avatarTaken = false
  @observable saving = false

  @action
  async componentDidMount() {
    this.setAsked();
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setGranted(status === "granted");
  }

  @action
  setAsked() {
    this.permissionAsked = true;
  }

  @action
  setGranted(granted) {
    this.permissionGranted = granted;
  }

  @action setSaving(){
      this.saving = true
  }

  async takePhoto() {
    if (this.camera) {
        Vibration.vibrate()
        this.setSaving()
        const photo = await this.camera.takePictureAsync({
            quality: 0,
            base64: true
        });

      try {
        const snapshot = await this.props.photo.savePhoto(photo, this.props.uid);
        console.log('ok', snapshot)
      } catch(e) {
          console.error(e);
      }

      this.props.onClose()
    }
  }

  render() {
    const { permissionAsked, permissionGranted, avatarTaken, saving } = this;
    if (!permissionAsked) return <Text>Please give permissions to camera</Text>;
    if (!permissionGranted) return <Text>Permission was not granted</Text>;
    if (avatarTaken) {
      this.props.onClose();
    }
    if(saving){
        return <ActivityIndicator size='small'/>
    }

    return (
      <Modal
        visible={true}
        animationType="slide"
        onRequestClose={this.props.onClose}
        transparent={false}
      >
        <Camera
          ref={ref => (this.camera = ref)}
          style={{ flex: 1 }}
          type={Camera.Constants.Type.front}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "column",
              justifyContent: "flex-end"
            }}
          >
            <TouchableOpacity onPress={() => this.takePhoto()}>
              <View
                style={{
                  borderRadius: 50,
                  borderColor: "white",
                  borderStyle: "solid",
                  borderWidth: 3,
                  height: 100,
                  width: 100
                }}
              >
                <Text style={{ fontSize: 30, color: "white" }}>*</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.onClose}>
              <Text>CLOSE IT</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </Modal>
    );
  }
}
