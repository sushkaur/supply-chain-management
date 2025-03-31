import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should send login request and navigate on success', fakeAsync(() => {
    component.email = 'test@example.com';
    component.password = 'password123';

    component.loginClicked();

    const req = httpMock.expectOne('http://localhost:5050/api/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      username: 'test@example.com',
      password: 'password123'
    });

    const mockResponse = { token: 'mock-token', role: 'admin' };
    req.flush(mockResponse);

    tick();

    expect(localStorage.getItem('token')).toBe('mock-token');
    expect(localStorage.getItem('role')).toBe('admin');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/view-manage-stocks']);
  }));

  it('should handle login failure and show error message', fakeAsync(() => {
    component.email = 'wrong@example.com';
    component.password = 'wrongpass';

    component.loginClicked();

    const req = httpMock.expectOne('http://localhost:5050/api/auth/login');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

    tick();

    expect(component.errorMessage).toBe('Invalid email or password');
  }));

  it('should show alert when registerClicked() is called', () => {
    spyOn(window, 'alert');
    component.registerClicked();
    expect(window.alert).toHaveBeenCalledWith('Register functionality not implemented yet.');
  });
});