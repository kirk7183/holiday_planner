// import firebase from 'firebase'
// import 'firebase/firestore'

import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyCus_h1jcTrfhGmrHPU1jKGfPUPs1ItwtI",
    authDomain: "holiday-planner-19683.firebaseapp.com",
    databaseURL: "https://holiday-planner-19683.firebaseio.com",
    projectId: "holiday-planner-19683",
    storageBucket: "holiday-planner-19683.appspot.com",
    messagingSenderId: "1031285780669",
    appId: "1:1031285780669:web:87557920cbd43786c3c7d4",
    measurementId: "G-92K60JQ69N"
};
// Initialize Firebase

// firebase.analytics();

const firebaseApp = firebase.initializeApp(firebaseConfig)

export const firestore = firebaseApp.firestore()
    // firestore.settings({ timestampsInSnapshots: true })
export default firebaseApp