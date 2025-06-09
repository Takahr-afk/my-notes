import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, query, where, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Note } from '../models/note.model';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  async getNotes(): Promise<Note[]> {
    const user = this.auth.currentUser;
    if (!user) return [];

    const notesRef = collection(this.firestore, 'notes');
    const q = query(notesRef, where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return { id: doc.id, ...data } as Note;
    });
  }

  async addNote(note: Omit<Note, 'id'>): Promise<string> {
    const notesRef = collection(this.firestore, 'notes');
    const docRef = await addDoc(notesRef, note);
    return docRef.id;
  }

  async updateNote(id: string, note: Partial<Note>): Promise<void> {
    const noteRef = doc(this.firestore, `notes/${id}`);
    await updateDoc(noteRef, { ...note, updatedAt: new Date() });
  }

  async deleteNote(id: string): Promise<void> {
    const noteRef = doc(this.firestore, `notes/${id}`);
    await deleteDoc(noteRef);
  }
}
