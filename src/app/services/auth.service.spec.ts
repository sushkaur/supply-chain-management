import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const dummyRegisterData = {
    username: 'testuser',
    password: 'testpass',
    role: 'buyer'
  };

  const dummyLoginData = {
    username: 'testuser',
    password: 'testpass'
  };

  const dummyResponse = {
    token: 'fake-jwt-token',
    role: 'buyer'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no open requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send POST request to /register', () => {
    service.register(dummyRegisterData).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('http://localhost:5050/api/auth/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyRegisterData);
    req.flush(dummyResponse);
  });

  it('should send POST request to /login', () => {
    service.login(dummyLoginData).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('http://localhost:5050/api/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyLoginData);
    req.flush(dummyResponse);
  });
});