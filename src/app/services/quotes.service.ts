import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { uploadString } from 'firebase/storage';
import { Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  constructor(
    private auth: Auth,
    private storage: Storage,
    private firestore: Firestore
  ) { }


  async uploadProfilePicture(cameraFile: Photo) {
    const user = this.auth.currentUser;
    const path = `users/${user.uid}/quotes-images.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');
      const imageUrl = await getDownloadURL(storageRef);
      const userDocRef = doc(this.firestore, `users/${user.uid}/quotes-data`);
      await setDoc(userDocRef, {
        imageUrl
      });
      console.log("Image URL: ", imageUrl);
      return true;
    } catch (e) {
      return null;
    }
  }


}
