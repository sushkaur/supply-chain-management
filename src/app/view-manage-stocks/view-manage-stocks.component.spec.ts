import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewManageStocksComponent } from './view-manage-stocks.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { of, throwError } from 'rxjs';
import { InventoryService } from '../services/inventory.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ViewManageStocksComponent', () => {
  let component: ViewManageStocksComponent;
  let fixture: ComponentFixture<ViewManageStocksComponent>;
  let inventoryServiceSpy: jasmine.SpyObj<InventoryService>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  const mockItems = [
    {
      _id: '1',
      name: 'Laptop',
      category: 'Electronics',
      supplier: 'TechCorp',
      quantity: 10,
      price: 1200,
      updatedAt: new Date().toISOString()
    }
  ];

  beforeEach(async () => {
    inventoryServiceSpy = jasmine.createSpyObj('InventoryService', ['getAllInventory', 'deleteItem']);
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ViewManageStocksComponent],
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: InventoryService, useValue: inventoryServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewManageStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load inventory data from backend (success)', () => {
    inventoryServiceSpy.getAllInventory.and.returnValue(of(mockItems));
    component.loadInventoryFromBackend();
    expect(inventoryServiceSpy.getAllInventory).toHaveBeenCalled();
    expect(component.inventoryItems.length).toBe(1);
    expect(component.dataSource.data.length).toBe(1);
  });

  it('should handle error when loading inventory', () => {
    spyOn(console, 'error');
    inventoryServiceSpy.getAllInventory.and.returnValue(throwError(() => new Error('Server error')));
    component.loadInventoryFromBackend();
    expect(console.error).toHaveBeenCalledWith('Error fetching inventory:', jasmine.any(Error));
  });

  it('should update item after dialog returns updated data', () => {
    const originalItem = { ...mockItems[0], id: 1, lastUpdated: 'Today' };
    component.inventoryItems = [originalItem];
    component.dataSource.data = [originalItem];

    matDialogSpy.open.and.returnValue({
      afterClosed: () => of({ ...originalItem, quantity: 20 })
    } as any);

    component.editItem(originalItem);
    expect(component.dataSource.data[0].quantity).toBe(20);
  });

  it('should not update item if dialog returns undefined', () => {
    const originalItem = { ...mockItems[0], id: 1, lastUpdated: 'Today' };
    component.inventoryItems = [originalItem];
    component.dataSource.data = [originalItem];

    matDialogSpy.open.and.returnValue({
      afterClosed: () => of(undefined)
    } as any);

    component.editItem(originalItem);
    expect(component.dataSource.data[0].quantity).toBe(10);
  });

  it('should delete item and reload inventory if confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    inventoryServiceSpy.deleteItem.and.returnValue(of({}));
    inventoryServiceSpy.getAllInventory.and.returnValue(of([]));

    component.deleteItem('1');
    expect(inventoryServiceSpy.deleteItem).toHaveBeenCalledWith('1');
    expect(inventoryServiceSpy.getAllInventory).toHaveBeenCalled();
  });

  it('should not delete item if confirm is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.deleteItem('1');
    expect(inventoryServiceSpy.deleteItem).not.toHaveBeenCalled();
  });

  it('should handle error when deleting an item', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(console, 'error');
    inventoryServiceSpy.deleteItem.and.returnValue(throwError(() => new Error('Delete failed')));
    component.deleteItem('123');
    expect(console.error).toHaveBeenCalledWith('Error deleting item:', jasmine.any(Error));
  });
});