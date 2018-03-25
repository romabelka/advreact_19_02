import {observable, action} from 'mobx'
import firebase from 'firebase'
import BasicStore from './basic-store'
import { convertToByteArray } from "./utils";

class PhotoStore extends BasicStore {
    @observable photos = {}

    @action setPhotos = photos => (this.photos = photos)

    savePhoto = async (photo, uid) => {
        //return firebase.storage().ref().child('test.user').putString(photo.base64)
        const bytes = convertToByteArray(photo.base64)
        const uploadTask = firebase.storage().ref('images').child(`${uid}.jpg`).put(bytes)

        const promise = new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                snapshot => {
                    console.log('snapshot', sbapshot)
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log('Upload is ' + progress + '% done')
                },
                error =>reject(error),
                () => {
                    const downloadURL = uploadTask.snapshot.downloadURL
                    resolve(downloadURL)
                });
            })

        return promise
    }



    getPhotosUri = uid => firebase.storage().ref('images').child('web-app-user.jpg').getDownloadURL()
                        //firebase.storage().ref('images').child(`${uid}.jpg`).getDownloadURL()
}

export default PhotoStore