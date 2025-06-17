import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommendeComponent } from './commende.component';

describe('CommendeComponent', () => {
  let component: CommendeComponent;
  let fixture: ComponentFixture<CommendeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommendeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommendeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
