import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  setDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  public getAllBills() {
    let billList: any[] = [];
    let billCollection = collection(this.firestore, 'list-of-expense');
    return collectionData(billCollection);

    //return billList;
  }

  public addNewBill(title: string, amount: number) {
    const docRef = doc(this.firestore, `/list-of-expense/${title}`);
    setDoc(docRef, { title: title, amount: amount });
  }
}
