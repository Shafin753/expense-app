import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  setDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { take, tap } from 'rxjs';
import { FirebaseService } from './services/firebase.service';

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
  public billList: any[] = [];

  constructor(private firebaseService: FirebaseService) {}

  public ngOnInit(): void {
    this.firebaseService
      .getAllBills()
      .pipe(
        tap((bills) => {
          this.billList = bills;
        })
      )
      .subscribe();
  }
}
