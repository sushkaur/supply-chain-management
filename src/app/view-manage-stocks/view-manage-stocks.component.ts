import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { InventoryService } from '../services/inventory.service';
import { EditStockDialogComponent } from '../edit-stock-dialog/edit-stock-dialog.component';

interface InventoryItem {
  _id: string; // MongoDB ID
  id: number;  // Display ID
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
export class ViewManageStocksComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'category', 'supplier', 'quantity', 'price', 'lastUpdated', 'actions'];
  dataSource = new MatTableDataSource<InventoryItem>();
  inventoryItems: InventoryItem[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly inventoryService: InventoryService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadInventoryFromBackend();
  }

  loadInventoryFromBackend(): void {
    this.inventoryService.getAllInventory().subscribe({
      next: (items) => {
        this.inventoryItems = items.map((item: any, index: number) => ({
          _id: item._id,
          id: index + 1,
          name: item.name,
          category: item.category,
          supplier: item.supplier,
          quantity: item.quantity,
          price: item.price,
          lastUpdated: new Date(item.updatedAt).toLocaleDateString()
        }));

        this.dataSource = new MatTableDataSource(this.inventoryItems);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Error fetching inventory:', err);
      }
    });
  }

  editItem(item: InventoryItem): void {
    const dialogRef = this.dialog.open(EditStockDialogComponent, {
      width: '400px',
      data: { ...item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.inventoryItems.findIndex(i => i._id === result._id);
        if (index !== -1) {
          this.inventoryItems[index] = {
            ...this.inventoryItems[index],
            ...result
          };
          this.dataSource.data = [...this.inventoryItems];
        }
      }
    });
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