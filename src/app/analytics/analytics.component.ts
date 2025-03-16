import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
  standalone: false
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.createSalesChart();
    this.createUserGrowthChart();
  }

  createSalesChart(): void {
    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Sales Revenue (€)',
          data: [12000, 15000, 18000, 22000, 26000, 30000],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  createUserGrowthChart(): void {
    const ctx = document.getElementById('userGrowthChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'User Growth',
          data: [500, 700, 1200, 1800, 2500, 3200],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}