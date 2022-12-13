importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");


const firebaseConfig = {
  apiKey: "AIzaSyA9VnDQL2IFaHjc_eTjb9vHbLPnobBCxII",
  authDomain: "ramzey-altin-pro.firebaseapp.com",
  projectId: "ramzey-altin-pro",
  storageBucket: "ramzey-altin-pro.appspot.com",
  messagingSenderId: "1043095349075",
  appId: "1:1043095349075:web:bac7b8c74a5da99e37e3a6",
  measurementId: "G-2VRPWMSY56"
};

const messaging = firebase.messaging();

// Optional:
messaging.onBackgroundMessage((message) => {
  console.log("onBackgroundMessage", message);
});