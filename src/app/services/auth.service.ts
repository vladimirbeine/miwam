import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { SignupInterface } from '../interfaces/user';
import { setDoc, DocumentReference } from 'firebase/firestore';
import { doc, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private firestore: Firestore) {
  }

  signup(user: SignupInterface): Promise<void> {
    return createUserWithEmailAndPassword(
        this.auth,
        user.email,
        user.password
      ).then (async () => {
        const userDocumentReference: DocumentReference = doc(this.firestore, `/users/${this.auth.currentUser.uid}`);
        await setDoc(userDocumentReference, {
          id: this.auth.currentUser.uid,
          email: user.email,
          password: user.password,
          firstname: user.firstname,
          lastname: user.lastname,
          phone: user.phone,
          createdAt: new Date(),
          role: 'user'
        });
      }).catch(e => {
        console.log("Error on signup: ", e);
      });
  }

  async signin({ email, password }) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      return null;
    }
  }
 
  logout() {
    return signOut(this.auth);
  }

}
