import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewManageStocksComponent } from './view-manage-stocks.component';

describe('ViewManageStocksComponent', () => {
  let component: ViewManageStocksComponent;
  let fixture: ComponentFixture<ViewManageStocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewManageStocksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewManageStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
