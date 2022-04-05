import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserreportComponent } from './admin-userreport.component';

describe('AdminUserreportComponent', () => {
  let component: AdminUserreportComponent;
  let fixture: ComponentFixture<AdminUserreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
