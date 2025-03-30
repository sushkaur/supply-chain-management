import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InventoryService } from '../services/inventory.service';

interface InventoryItem {
  _id: string; // Real MongoDB ID
  id: number;  // Just for display index
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
  dataSource = new MatTableDataSource<InventoryItem>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadInventoryFromBackend();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadInventoryFromBackend(): void {
    this.inventoryService.getAllInventory().subscribe({
      next: (items) => {
        const formattedItems: InventoryItem[] = items.map((item: any, index: number) => ({
          _id: item._id,
          id: index + 1,
          name: item.name,
          category: item.category,
          supplier: item.supplier,
          quantity: item.quantity,
          price: item.price,
          lastUpdated: new Date(item.updatedAt).toLocaleDateString()
        }));

        this.dataSource = new MatTableDataSource(formattedItems);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Error fetching inventory:', err);
      }
    });
  }

  editItem(item: InventoryItem): void {
    console.log('Editing item:', item);
    alert(`Editing item: ${item.name}`);
    // To be replaced with modal or form later
  }

  deleteItem(mongoId: string): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.inventoryService.deleteItem(mongoId).subscribe({
        next: () => this.loadInventoryFromBackend(),
        error: (err) => {
          console.error('Error deleting item:', err);
        }
      });
    }
  }
}