import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBYBRvOMGK5ejjOt7_ChnU9UORJMk3g2Hk",
  authDomain: "alcostore-6429d.firebaseapp.com",
  databaseURL: "https://alcostore-6429d.firebaseio.com",
  projectId: "alcostore-6429d",
  storageBucket: "alcostore-6429d.appspot.com",
  messagingSenderId: "760707906640",
  appId: "1:760707906640:web:b84a5b39e0c45a9c"
};

const fire = firebase.initializeApp(config);
export default fire;
