import firebase from 'firebase'

export const appName = 'advreact-19-02-4f0bf'

const config = {
    apiKey: 'AIzaSyDQWtwh77Au5QEY_Ky_VewoGbegWdxEtwU',
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: "1048866865605"
}

firebase.initializeApp(config)