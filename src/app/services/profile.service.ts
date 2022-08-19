import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, DocumentReference, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private firestore: Firestore, private auth: Auth) {
  }

  getProfile() {
    const userDocumentReference: DocumentReference = doc(this.firestore, `/users/${this.auth.currentUser.uid}`);
    return docData(userDocumentReference, { idField: 'id' });
  }

}
