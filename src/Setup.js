

import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import messaging from '@react-native-firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyD7fpmUGgM1x5Hym2R7RTnXKmdUL2HtYtw",
  authDomain: "flincs-f1458.firebaseapp.com",
  projectId: "flincs-f1458",
  storageBucket: "flincs-f1458.appspot.com",
  messagingSenderId: "318498965868",
  appId: "1:318498965868:web:04be170d2b286c7c934b49",
  measurementId: "G-QTSRBNBB0J"
};
// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export {
  firebase,
  Auth,
  database,
  dynamicLinks,
  messaging

};


// const Setup = () => {
 
//   return <App />;
// };

// export default Setup;