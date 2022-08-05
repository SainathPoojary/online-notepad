import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/initFirebase";

export function addText(id, data = "") {
  setDoc(doc(db, "notes", id), {
    text: data,
  }).catch((err) => console.log(err));
}

export function isIdExist(id) {
  return new Promise((resolve, reject) => {
    getDoc(doc(db, "notes", id))
      .then((docSnap) => resolve(docSnap.exists()))
      .catch((err) => reject(err.message));
  });
}

export function getText(id) {
  return new Promise((resolve, reject) => {
    getDoc(doc(db, "notes", id))
      .then((docSnap) => {
        if (docSnap.exists()) {
          resolve(docSnap.data().text);
        } else {
          resolve(null);
        }
      })
      .catch((err) => reject(err.message));
  });
}
