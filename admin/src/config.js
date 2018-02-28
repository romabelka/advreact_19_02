import firebase from 'firebase'

export const appName = 'advreact-19-02'

const config = {
    apiKey: 'AIzaSyBZMD54q-jZ4o9T-BpDkC4gNUGHtQ9ffNk',
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: "420104327635"
}

firebase.initializeApp(config)