import { Injectable, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Status } from '../interfaces/status';
import { ToastService } from './controllers/toast.service';

@Injectable({
  providedIn: 'root'
})
export class StatusService implements OnInit {

  private allStatusesCollection: AngularFirestoreCollection<Status>;
  private allStatuses: Observable<Status[]>;

  private currentUserStatusesCollection: AngularFirestoreCollection<Status>;
  private currentUserStatuses: Observable<Status[]>;

  constructor(private db: AngularFirestore, private auth: Auth, private toastCtlr: ToastService) {
    this.allStatusesCollection = this.db.collection<Status>("sms", ref => ref.orderBy("createdAt"));
    this.allStatuses = this.allStatusesCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((status) => {
          return { id: status.payload.doc.id, ...status.payload.doc.data() };
        });
      })
    );
  }

  ngOnInit() {
  }
  
  async addStatus(
    title: string,
    message: string,
    category: string
  ): Promise<void>{
    return this.allStatusesCollection.add({
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

  
  getAllStatuses(): Observable<Status[]> {
    return this.allStatuses;
  }

  getCurrenUserStatuses(): Observable<Status[]> {
    return this.currentUserStatuses;
  }

  updateStatus(status: Status, id: string): Promise<any> {
    return this.currentUserStatusesCollection.doc(id).update(status);
  }
  
  removeStatus(id: string): Promise<any> {
    return this.currentUserStatusesCollection.doc(id).delete();
  }
}
