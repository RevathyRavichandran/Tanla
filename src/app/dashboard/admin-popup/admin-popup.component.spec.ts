import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPopupComponent } from './admin-popup.component';

describe('AdminPopupComponent', () => {
  let component: AdminPopupComponent;
  let fixture: ComponentFixture<AdminPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
