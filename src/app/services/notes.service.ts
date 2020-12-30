import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Note } from '../shared/interfaces/note';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private firestore: AngularFirestore) {}

  findUserNotes(email: string): Observable<firebase.firestore.DocumentData> {
    return this.firestore
      .collection('users')
      .doc(email)
      .get();
  }

  createOrUpdateNotes(data: Note): Promise<void> {
    const { email, notes, lastSaved } = data;
    return this.firestore
      .collection('users')
      .doc(email)
      .set({ notes, lastSaved })
      .catch((error) => {
        console.log(error);
        window.alert('Something went wrong. Try again.');
      });
  }
}
