import { TestBed } from '@angular/core/testing';
import { InventoryService } from './inventory.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpHeaders } from '@angular/common/http';

describe('InventoryService', () => {
  let service: InventoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InventoryService]
    });

    service = TestBed.inject(InventoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAuthHeaders', () => {
    it('should return headers with token when token exists', () => {
      localStorage.setItem('token', 'mock-token');
      const headers = (service as any).getAuthHeaders();
      expect(headers.headers instanceof HttpHeaders).toBeTrue();
      expect(headers.headers.get('Authorization')).toBe('Bearer mock-token');
    });

    it('should return headers without token when token does not exist', () => {
      const headers = (service as any).getAuthHeaders();
      expect(headers.headers.get('Authorization')).toBe('Bearer ');
    });
  });

  it('should call GET /api/inventory', () => {
    service.getAllInventory().subscribe();
    const req = httpMock.expectOne('http://localhost:5050/api/inventory');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should call POST /api/inventory with data and headers', () => {
    const payload = { name: 'Keyboard' };
    service.createItem(payload).subscribe();
    const req = httpMock.expectOne('http://localhost:5050/api/inventory');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush({});
  });

  it('should call PUT /api/inventory/:id with data and headers', () => {
    const id = '123';
    const payload = { name: 'Mouse' };
    service.updateItem(id, payload).subscribe();
    const req = httpMock.expectOne(`http://localhost:5050/api/inventory/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(payload);
    req.flush({});
  });

  it('should call DELETE /api/inventory/:id without headers', () => {
    const id = '456';
    service.deleteItem(id).subscribe();
    const req = httpMock.expectOne(`/api/inventory/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});