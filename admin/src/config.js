import firebase from 'firebase'

export const appName = 'advreact-63a70'

const config = {
    apiKey: 'AIzaSyBHR1OicAjWtBbpYQ1gKPHm0VrH0PG5lFY',
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: "247831418413"
}

firebase.initializeApp(config)
