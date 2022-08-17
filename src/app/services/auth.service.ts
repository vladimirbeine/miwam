import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  UserCredential
} from '@angular/fire/auth';
import { SignupInterface, UserInterface } from '../interfaces/user';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signedUpUserCollection: AngularFirestoreCollection<SignupInterface>;
  private users: Observable<SignupInterface[]>;

  constructor(
    private auth: Auth,
    db: AngularFirestore
    ) {
    
    this.signedUpUserCollection = db.collection<SignupInterface>("users", ref => ref.orderBy("id"));

    this.users = this.signedUpUserCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((user) => {
          //loops through users and returns user with id
          return { id: user.payload.doc.id, ...user.payload.doc.data() };
        });
      })
    );
  }

  async signup(user: SignupInterface) {
    try {
      const userSignedUp = await createUserWithEmailAndPassword(
        this.auth,
        user.email,
        user.password
      ).then((newUser: UserCredential) =>{
        this.signedUpUserCollection.add({
          id: newUser.user.uid,
          email: user.email,
          password: user.password,
          firstname: user.firstname,
          lastname: user.lastname,
          createdAt: user.createdAt,
          phone: user.phone
        });
      });

      return userSignedUp;
    } catch (e) {
      return null;
    }
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

  // Return observable array of todos
  getAllUsers(): Observable<UserInterface[]> {
    return this.users;
  }
  // Return a todo from database collection by id to view
  getCurrentUser(id: string): Observable<UserInterface> {
    return this.signedUpUserCollection.doc<UserInterface>(id).valueChanges();
  }

}
