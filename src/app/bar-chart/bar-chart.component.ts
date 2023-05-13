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

const Color = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(255, 205, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(201, 203, 207, 0.2)',
  'rgba(168, 114, 146, 0.7)',
  'rgba(150, 123, 139, 0.7)',
  'rgba(101, 148, 14, 0.7)',
  'rgba(3, 48, 181, 0.7)',
  'rgba(216, 10, 10, 1)',
];

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
  public backgroundColor: string[] = [];

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['billList'] && this.chart) {
      this.amount = [];
      this.labels = [];
      this.billList.forEach((bill) => {
        this.amount.push(bill.amount);
        this.labels.push(bill.title);
        this.backgroundColor.push(
          Color[Math.floor(Math.random() * Color.length - 1)]
        );
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
    let delayed: boolean;
    this.chart = new Chart('MyChart', {
      type: 'bar', //this denotes tha type of chart
      data: {
        // values on X-Axis
        labels: this.labels,
        datasets: [
          {
            label: 'Cost',
            data: this.amount,
            backgroundColor: this.backgroundColor,
            borderColor: 'black',
            borderWidth: 1,
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
