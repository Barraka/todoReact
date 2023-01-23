/**
 * To find your Firebase config object:
 * 
 * 1. Go to your [Project settings in the Firebase console](https://console.firebase.google.com/project/_/settings/general/)
 * 2. In the "Your apps" card, select the nickname of the app for which you need a config object.
 * 3. Select Config from the Firebase SDK snippet pane.
 * 4. Copy the config object snippet, then add it here.
 */
//  const config = {
//     apiKey: "AIzaSyCUHbq0D-ptbhMicfy0vpOghBh7TgZkJLM",
//     authDomain: "friendlychat-1b946.firebaseapp.com",
//     projectId: "friendlychat-1b946",
//     storageBucket: "friendlychat-1b946.appspot.com",
//     messagingSenderId: "518984106584",
//     appId: "1:518984106584:web:73c90e291b03bb449a002d"
// };
const firebaseConfig = {
    apiKey: "AIzaSyCPeO8O8rJAckBkuhtOcZE6RE2bZEX-nhk",
    authDomain: "mydolist1.firebaseapp.com",
    databaseURL: "https://mydolist1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mydolist1",
    storageBucket: "mydolist1.appspot.com",
    messagingSenderId: "589204967185",
    appId: "1:589204967185:web:bb2a67ef60a30363d9c6b0",
    measurementId: "G-W8KG01L0JR"
  };
export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
    'Add your web app\'s configuration object to firebase-config.js');
  } else {
    return config;
  }
}