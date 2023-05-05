import { Component, Input, OnInit } from '@angular/core';

interface Transaction {
  title: string;
  amount: number;
}

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.scss'],
})
export class ExpenseTableComponent implements OnInit {
  @Input() billList!: Transaction[];
  displayedColumns: string[] = ['title', 'amount'];

  constructor() {}
  public ngOnInit(): void {}

  getTotalCost() {
    return this.billList
      .map((t) => t.amount)
      .reduce((acc, value) => acc + value, 0);
  }

  someTest(row: any) {
    console.log(row);
  }
}
