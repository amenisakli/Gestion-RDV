import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCComponent } from './service-c.component';

describe('ServiceCComponent', () => {
  let component: ServiceCComponent;
  let fixture: ComponentFixture<ServiceCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ServiceCComponent]
    });
    fixture = TestBed.createComponent(ServiceCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
