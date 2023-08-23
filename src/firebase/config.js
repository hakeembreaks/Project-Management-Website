import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAoNoTvceIK7gkrRltVCuLggqji1Z3v2ZU",
  authDomain: "thedojosite-7d65b.firebaseapp.com",
  projectId: "thedojosite-7d65b",
  storageBucket: "thedojosite-7d65b.appspot.com",
  messagingSenderId: "659510695432",
  appId: "1:659510695432:web:91ae119fbb46f6b53463bd",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp, projectStorage };
