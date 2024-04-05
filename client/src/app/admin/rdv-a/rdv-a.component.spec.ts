import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvAComponent } from './rdv-a.component';

describe('RdvAComponent', () => {
  let component: RdvAComponent;
  let fixture: ComponentFixture<RdvAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RdvAComponent]
    });
    fixture = TestBed.createComponent(RdvAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
