// Import the functions you need from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_uukEnHAAgyaw8Qxhrl1nwcZj_jmsK9c",
  authDomain: "product-list-a6129.firebaseapp.com",
  projectId: "product-list-a6129",
  storageBucket: "product-list-a6129.appspot.com",
  messagingSenderId: "261995389700",
  appId: "1:261995389700:web:5bbef7bae829f637816651",
  measurementId: "G-H8G1NQ76FZ",
  // Disable offline persistence
  persistence: false
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

async function addProductToFirestore(productData) {
  console.log('Adding product to Firestore:', productData);
  try {
    const docRef = await addDoc(collection(db, 'products'), productData);
    console.log('Product added with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding product: ', e);
  }
}

async function uploadImageToStorage(file) {
  const storageRef = ref(storage, 'images/' + file.name);
  try {
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
}

// // Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }

export { addProductToFirestore, uploadImageToStorage };
