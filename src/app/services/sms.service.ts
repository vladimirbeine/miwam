import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, DocumentReference, Firestore, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ToastService } from './controllers/toast.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { map } from "rxjs/operators";

export interface SMS {
  userId: string,
  title: string,
  message: string,
  category: string,
  createdAt: number,
  updatedAt: number,
  likes: number,
  views: number,
  shares: number
}

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  private smsCollection: AngularFirestoreCollection<SMS>;
  private allSMS: Observable<SMS[]>;

  constructor(
    private auth: Auth,
    private toastCtlr: ToastService,
    db: AngularFirestore
  ) {
    this.smsCollection = db.collection<SMS>("sms", ref => ref.orderBy("createdAt"));

    this.allSMS = this.smsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((sms) => {
          //loops through todos and returns item with id
          return { id: sms.payload.doc.id, ...sms.payload.doc.data() };
        });
      })
    );
  }

  async addSMS(
    title: string,
    message: string,
    category: string
  ): Promise<void>{
    return this.smsCollection.add({
      userId: this.auth.currentUser.uid,
      title,
      message,
      category,
      createdAt: Date.now(),
      updatedAt: null,
      likes: null,
      views: null,
      shares: null
    }).then(() => {
      const message: string = "SMS ajoute avec succes!"
      this.toastCtlr.default(message);
    }).catch(e => {
      const message: string = "Votre SMS n'a pas ete ajoute!"
      this.toastCtlr.error(message);

      console.log("Error on signup: ", e);
    });;
  }

  getAllSMS(): Observable<SMS[]> {
    return this.allSMS;
  }
}
