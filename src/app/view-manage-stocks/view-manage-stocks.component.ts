import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  supplier: string;
  quantity: number;
  price: number;
  lastUpdated: string;
}

@Component({
  selector: 'app-view-manage-stocks',
  templateUrl: './view-manage-stocks.component.html',
  styleUrls: ['./view-manage-stocks.component.css'],
  standalone: false
})
export class ViewManageStocksComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'category', 'supplier', 'quantity', 'price', 'lastUpdated', 'actions'];
  dataSource: MatTableDataSource<InventoryItem>;

  inventoryItems: InventoryItem[] = [
    { id: 1, name: 'Laptop', category: 'Electronics', supplier: 'Tech Corp', quantity: 10, price: 1000, lastUpdated: '2025-03-10' },
    { id: 2, name: 'Mouse', category: 'Accessories', supplier: 'Hardware Ltd', quantity: 50, price: 20, lastUpdated: '2025-03-12' },
    { id: 3, name: 'Keyboard', category: 'Accessories', supplier: 'Hardware Ltd', quantity: 30, price: 50, lastUpdated: '2025-03-08' },
    { id: 4, name: 'Monitor', category: 'Electronics', supplier: 'Tech World', quantity: 15, price: 200, lastUpdated: '2025-03-14' },
    { id: 5, name: 'Printer', category: 'Office Equipment', supplier: 'Office Depot', quantity: 8, price: 150, lastUpdated: '2025-03-11' },
    { id: 6, name: 'Desk Chair', category: 'Furniture', supplier: 'FurniCo', quantity: 25, price: 120, lastUpdated: '2025-03-09' },
    { id: 7, name: 'External Hard Drive', category: 'Storage', supplier: 'DataTech', quantity: 40, price: 80, lastUpdated: '2025-03-13' },
    { id: 8, name: 'Router', category: 'Networking', supplier: 'NetGear', quantity: 18, price: 90, lastUpdated: '2025-03-12' },
    { id: 9, name: 'Graphics Card', category: 'Electronics', supplier: 'GPU Experts', quantity: 12, price: 500, lastUpdated: '2025-03-07' },
    { id: 10, name: 'SSD 1TB', category: 'Storage', supplier: 'DataTech', quantity: 22, price: 150, lastUpdated: '2025-03-05' }
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.dataSource = new MatTableDataSource(this.inventoryItems);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.inventoryItems);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  editItem(item: InventoryItem): void {
    console.log('Editing item:', item);
    alert(`Editing item: ${item.name}`);
  }

  deleteItem(id: number): void {
    this.inventoryItems = this.inventoryItems.filter(item => item.id !== id);
    this.dataSource.data = this.inventoryItems;
  }
}