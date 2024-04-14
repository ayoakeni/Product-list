// Import Firebase services
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Initialize Firebase with your config
const firebaseConfig = {
  apiKey: "AIzaSyC_uukEnHAAgyaw8Qxhrl1nwcZj_jmsK9c",
  authDomain: "product-list-a6129.firebaseapp.com",
  projectId: "product-list-a6129",
  storageBucket: "product-list-a6129.appspot.com",
  messagingSenderId: "261995389700",
  appId: "1:261995389700:web:5bbef7bae829f637816651",
  measurementId: "G-H8G1NQ76FZ"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

async function addProductToFirestore(productData) {
  try {
    const docRef = await db.collection('products').add(productData);
    console.log('Product added with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding product: ', e);
  }
}

async function uploadImageToStorage(file) {
  const storageRef = storage.ref('images/' + file.name);
  try {
    const snapshot = await storageRef.put(file);
    const imageUrl = await snapshot.ref.getDownloadURL();
    return imageUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
}

export { addProductToFirestore };


// // Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }

// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';

// const firebaseConfig = {
//   // Your Firebase configuration
//   // apiKey, authDomain, projectId, etc.
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// // Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }
