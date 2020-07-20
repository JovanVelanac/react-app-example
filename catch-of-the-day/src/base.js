import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD3bXP8E2GTe7dvlAnAB5z29jGo5CuflEc",
  authDomain: "marketplace-b445b.firebaseapp.com",
  databaseURL: "https://marketplace-b445b.firebaseio.com",

});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
