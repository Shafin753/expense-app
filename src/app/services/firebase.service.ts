import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  setDoc,
  doc,
  updateDoc,
  query,
} from '@angular/fire/firestore';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChange,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  items: Observable<DocumentChangeAction<any>[]> | undefined;
  itemsCollection: AngularFirestoreCollection<any> | undefined;

  constructor(private afs: AngularFirestore) {}

  public getAllBills(): Observable<any[]> {
    let billList: any[] = [];
    // let billCollection = collection(this.firestore, 'list-of-expense');
    // return collectionData(billCollection);
    //this.itemsCollection = this.afs.collection<Item>('items', ref => ref.where('name', '==', 'example'));
    return this.afs
      .collection('list-of-expense', (ref) => ref.where('type', '==', 2))
      .valueChanges();

    //this.items = this.itemsCollection.snapshotChanges();

    //return this.items;

    // this.itemsCollection = this.firestore.collection(
    //   'items',
    //   (ref: any) => {
    //     // Apply the query to the collection
    //     return ref.where('property', '==', 'value').orderBy('property');
    //   }
    // );
    //return billList;
  }

  public addNewBill(title: string, amount: number, moneyFlowType: number) {
    // const docRef = doc(this.firestore, `/list-of-expense/${title}`);
    // setDoc(docRef, { title: title, amount: amount });
    this.afs
      .collection('list-of-expense')
      .doc(title)
      .set({ title: title, amount: amount, type: moneyFlowType });
  }
}
