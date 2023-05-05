import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-bill-entry',
  templateUrl: './bill-entry.component.html',
  styleUrls: ['./bill-entry.component.scss'],
})
export class BillEntryComponent {
  public billTitle!: string;
  public amount!: number;

  constructor(private firebaseService: FirebaseService) {}

  public billTitleUpdate(event: any) {
    console.log(event.target.value);
    this.billTitle = event.target.value;
  }

  public amountUpdateChange(event: any) {
    console.log(event.target.value);
    this.amount = parseFloat(event.target.value);
  }

  public submitData() {
    this.firebaseService.addNewBill(this.billTitle, this.amount);
  }
}
