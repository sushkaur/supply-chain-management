import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RegisterComponent } from './register.component';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['register']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call registerClicked and navigate on success', fakeAsync(() => {
    const mockResponse = { token: 'mockToken', role: 'buyer' };
    mockAuthService.register.and.returnValue(of(mockResponse));

    spyOn(localStorage, 'setItem');
    component.username = 'testuser';
    component.password = 'password';
    component.registerClicked();

    tick();
    expect(mockAuthService.register).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password',
      role: 'buyer'
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mockToken');
    expect(localStorage.setItem).toHaveBeenCalledWith('role', 'buyer');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/view-manage-stocks']);
    expect(component.successMessage).toBe('Registration successful!');
  }));

  it('should handle error in registerClicked', fakeAsync(() => {
    const mockError = { error: { message: 'Registration failed' } };
    mockAuthService.register.and.returnValue(throwError(() => mockError));

    component.registerClicked();
    tick();
    expect(component.errorMessage).toBe('Registration failed');
  }));

  it('should show success alert and navigate on successful onRegister', fakeAsync(() => {
    mockAuthService.register.and.returnValue(of({}));
    spyOn(window, 'alert');

    component.username = 'testuser';
    component.password = 'password';
    component.onRegister();

    tick();
    expect(mockAuthService.register).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Registration Successful!');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  }));

  it('should show failure alert on register error in onRegister', fakeAsync(() => {
    mockAuthService.register.and.returnValue(throwError(() => ({ error: {} })));
    spyOn(window, 'alert');

    component.onRegister();
    tick();
    expect(window.alert).toHaveBeenCalledWith('Registration Failed!');
  }));

  it('should navigate to login page when navigateToLogin is called', () => {
    component.navigateToLogin();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});