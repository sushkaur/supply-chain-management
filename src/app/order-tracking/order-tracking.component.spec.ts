import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderTrackingComponent } from './order-tracking.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('OrderTrackingComponent', () => {
  let component: OrderTrackingComponent;
  let fixture: ComponentFixture<OrderTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderTrackingComponent],
      imports: [MatPaginatorModule, MatTableModule, NoopAnimationsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should attach paginator after view init', () => {
    const paginator = TestBed.inject(MatPaginator);
    component.paginator = paginator;
    component.ngAfterViewInit();
    expect(component.dataSource.paginator).toBe(paginator);
  });

  it('should update order status and progress correctly', () => {
    const targetOrder = component.orders[0];
    const originalStatus = targetOrder.status;
    component.updateOrderStatus(targetOrder.orderId, 'Delivered');

    const updated = component.orders.find(o => o.orderId === targetOrder.orderId);
    expect(updated?.status).toBe('Delivered');
    expect(updated?.progress).toBe(100);
    expect(updated?.status).not.toBe(originalStatus);
  });

  it('should do nothing if order ID is invalid', () => {
    const originalOrders = [...component.orders];
    component.updateOrderStatus('INVALID', 'Shipped');
    expect(component.orders).toEqual(originalOrders);
  });

  describe('getProgressFromStatus', () => {
    it('should return correct progress for each status', () => {
      expect(component['getProgressFromStatus']('Pending')).toBe(20);
      expect(component['getProgressFromStatus']('Processing')).toBe(40);
      expect(component['getProgressFromStatus']('Shipped')).toBe(70);
      expect(component['getProgressFromStatus']('Delivered')).toBe(100);
    });

    it('should return 0 for unknown status', () => {
      expect(component['getProgressFromStatus']('Cancelled')).toBe(0);
    });
  });
});