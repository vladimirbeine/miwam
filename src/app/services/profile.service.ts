import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { Firestore, doc, setDoc, updateDoc } from '@angular/fire/firestore';
import { uploadString } from 'firebase/storage';
import { Profile } from '../interfaces/profile';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Photo } from '@capacitor/camera';
import { Auth } from '@angular/fire/auth';
import { ToastService } from './controllers/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileCollection: AngularFirestoreCollection<Profile>;
  private profile: Observable<Profile[]>;

  constructor(
    private db: AngularFirestore,
    private storage: Storage,
    private auth: Auth,
    private firestore: Firestore,
    private toastCtlr: ToastService
    ) {
    this.profileCollection = this.db.collection<Profile>("users");

    this.profile = this.profileCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((user) => {
          return { id: user.payload.doc.id, ...user.payload.doc.data() };
        });
      })
    );
  }

  ngOnInit() {}

  getProfile(id: string): Observable<Profile> {
    return this.profileCollection.doc<Profile>(id).valueChanges();
  }

  getUsersProfile(): Observable<Profile[]> {
    return this.profile;
  }

  updateProfile(
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    phone: number
    ): Promise<any> {
    return this.profileCollection.doc(id).update({
      firstname,
      lastname,
      email,
      phone,
      updatedAt: Date.now(),
    }).catch(e => {
      const message: string = "An error occured while updating your profile!"
      this.toastCtlr.error(message);

      console.log("Profile update failed: ", e);
    });;
  }
  
  async updateProfileAvatar(cameraFile: Photo): Promise<any> {
    const user = this.auth.currentUser;
    const path = `uploads/${user.uid}/profile.png`;
    const storageRef = ref(this.storage, path);

    
    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');
      const imageUrl = await getDownloadURL(storageRef);
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await updateDoc(userDocRef, {
        avatar: imageUrl,
      });
      console.log("Image URL: ", imageUrl);
      return true;
    } catch (e) {
      return null;
    }
  }

}
