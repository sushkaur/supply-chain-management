import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditStockDialogComponent } from './edit-stock-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EditStockDialogComponent', () => {
  let component: EditStockDialogComponent;
  let fixture: ComponentFixture<EditStockDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<EditStockDialogComponent>>;
  const mockData = {
    name: 'Keyboard',
    quantity: 10,
    price: 99,
    category: 'Electronics',
    supplier: 'Test Supplier'
  };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [EditStockDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: MatDialogRef, useValue: mockDialogRef }
      ],
      schemas: [NO_ERRORS_SCHEMA] // ignore template bindings like mat-dialog-title
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call dialogRef.close() on cancel', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalledWith();
  });

  it('should call dialogRef.close(data) on save', () => {
    component.onSave();
    expect(mockDialogRef.close).toHaveBeenCalledWith(mockData);
  });
});