import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { Chart } from 'chart.js/auto';

interface Transaction {
  title: string;
  amount: number;
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BarChartComponent implements OnInit, OnChanges {
  public chart: any;
  @Input() billList!: Transaction[];
  public labels: string[] = [];
  public amount: number[] = [];

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['billList'] && this.chart) {
      this.amount = [];
      this.labels = [];
      this.billList.forEach((bill) => {
        this.amount.push(bill.amount);
        this.labels.push(bill.title);
      });
      this.chart.data.labels = this.labels;
      this.chart.data.datasets[0].data = [];
      this.chart.data.datasets[0].data = this.amount;
      this.chart.update();
    }
  }
  ngAfterViewInit(): void {}

  public ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.labels,
        datasets: [
          {
            label: 'Cost',
            data: this.amount,
            backgroundColor: 'blue',
          },
        ],
      },
      options: {
        aspectRatio: 1.5,
      },
    });
  }

  getTotalCost() {
    return this.billList
      .map((t) => t.amount)
      .reduce((acc, value) => acc + value, 0);
  }
}
