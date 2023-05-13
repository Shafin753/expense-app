import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

enum MoneyFlow {
  Income = 1,
  Expense = 2,
}

@Component({
  selector: 'app-bill-entry',
  templateUrl: './bill-entry.component.html',
  styleUrls: ['./bill-entry.component.scss'],
})
export class BillEntryComponent {
  public billTitle!: string;
  public amount!: number;
  public moneyFlowType: number = MoneyFlow.Expense;
  public inputTitle: string = 'Bill Title';

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
    this.firebaseService.addNewBill(
      this.billTitle,
      this.amount,
      this.moneyFlowType
    );
  }

  public changeMoneyFlow(event: any) {
    this.moneyFlowType = parseInt(event.value);
    if (parseInt(event.value) === MoneyFlow.Income) {
      this.inputTitle = 'Income';
    } else {
      this.inputTitle = 'Bill Title';
    }
  }
}
