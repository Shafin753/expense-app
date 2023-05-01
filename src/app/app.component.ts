import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  setDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';

export interface Item {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'expense-app-2';

  constructor(private firestore: Firestore) {}

  public ngOnInit(): void {
    this.update();

    const test = collection(this.firestore, 'list-of-expense');
    let value = collectionData(test);
    value.subscribe((value) => console.log(value[0]));
  }

  async update() {
    const test2 = doc(this.firestore, '/list-of-expense/Wlz0U4Ws96xDR51kMQ68');
    await updateDoc(test2, { newValue3: 400 });
    //await setDoc(test2, { newValue: 400 });
  }
}
