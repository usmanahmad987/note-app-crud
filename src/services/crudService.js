// src/services/crudService.js

import { collection, addDoc, query, where, getDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../config/firebaseConfig";

// Function to upload an image to Firebase Storage and get the download URL
export const uploadImage = async (file) => {
  const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

// Function to delete an image from Firebase Storage
export const deleteImage = async (imageUrl) => {
  const imageRef = ref(storage, imageUrl);
  await deleteObject(imageRef);
};

export const createItem = async (userId, data, file) => {
  let imageUrl = "";
  if (file) {
    imageUrl = await uploadImage(file);
  }
  
  try {
    await addDoc(collection(db, "items"), {
      userId: userId,
      ...data,
      imageUrl: imageUrl,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error creating item: ", error);
  }
};

export const fetchItemsByUserId = async (userId) => {
  const q = query(collection(db, "items"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateItem = async (itemId, updatedData, newFile) => {
  const itemRef = doc(db, "items", itemId);

  let updatedImageUrl = updatedData.imageUrl;
  if (newFile) {
    if (updatedImageUrl) {
      await deleteImage(updatedImageUrl); // Delete old image if it exists
    }
    updatedImageUrl = await uploadImage(newFile); // Upload new image
  }

  try {
    await updateDoc(itemRef, {
      ...updatedData,
      imageUrl: updatedImageUrl,
    });
  } catch (error) {
    console.error("Error updating item: ", error);
  }
};

export const deleteItem = async (itemId) => {
  const itemRef = doc(db, "items", itemId);

  // Fetch the item document to get the image URL
  const itemSnap = await getDoc(itemRef);
  if (itemSnap.exists()) {
    const itemData = itemSnap.data();
    if (itemData.imageUrl) {
      // Delete the image from storage if it exists
      const imageRef = ref(storage, itemData.imageUrl);
      await deleteObject(imageRef);
    }
  }

  // Delete the item document from Firestore
  try {
    await deleteDoc(itemRef);
  } catch (error) {
    console.error("Error deleting item: ", error);
  }
};

// export const deleteItem = async (itemId) => {
//   const itemRef = doc(db, "items", itemId);

//   // Fetch the item to delete its image if it exists
//   const item = (await getDocs(itemRef)).data();
//   if (item?.imageUrl) {
//     await deleteImage(item.imageUrl);
//   }

//   try {
//     await deleteDoc(itemRef);
//   } catch (error) {
//     console.error("Error deleting item: ", error);
//   }
// };
