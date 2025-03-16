import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

interface Order {
  orderId: string;
  customerName: string;
  product: string;
  quantity: number;
  status: string;
  progress: number;
  lastUpdated: string;
}

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css'],
  standalone:false
})
export class OrderTrackingComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['orderId', 'customerName', 'product', 'quantity', 'status', 'progress', 'lastUpdated', 'actions'];
  dataSource: MatTableDataSource<Order>;

  orders: Order[] = [
    { orderId: 'ORD001', customerName: 'Alice Johnson', product: 'Laptop', quantity: 1, status: 'Shipped', progress: 70, lastUpdated: '2025-03-10' },
    { orderId: 'ORD002', customerName: 'Michael Smith', product: 'Smartphone', quantity: 2, status: 'Processing', progress: 40, lastUpdated: '2025-03-12' },
    { orderId: 'ORD003', customerName: 'Emily Davis', product: 'Headphones', quantity: 3, status: 'Delivered', progress: 100, lastUpdated: '2025-03-08' },
    { orderId: 'ORD004', customerName: 'John Williams', product: 'Tablet', quantity: 1, status: 'Pending', progress: 20, lastUpdated: '2025-03-14' },
    { orderId: 'ORD005', customerName: 'Sophia Brown', product: 'Smartwatch', quantity: 1, status: 'Shipped', progress: 80, lastUpdated: '2025-03-11' }
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.dataSource = new MatTableDataSource(this.orders);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  updateOrderStatus(orderId: string, newStatus: string): void {
    const order = this.orders.find(o => o.orderId === orderId);
    if (order) {
      order.status = newStatus;
      order.progress = this.getProgressFromStatus(newStatus);
      this.dataSource.data = [...this.orders]; // Refresh table data
    }
  }

  private getProgressFromStatus(status: string): number {
    switch (status) {
      case 'Pending': return 20;
      case 'Processing': return 40;
      case 'Shipped': return 70;
      case 'Delivered': return 100;
      default: return 0;
    }
  }
}