import firebase from 'firebase'

export const appName = 'advreact-d1121'

const config = {
    apiKey: "AIzaSyAWa_Fi5YHa4K-Irmb3QYaTp4KM3Heh9Gk",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: "744274120094"
}

firebase.initializeApp(config)
