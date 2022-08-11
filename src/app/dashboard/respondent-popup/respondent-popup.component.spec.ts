import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondentPopupComponent } from './respondent-popup.component';

describe('RespondentPopupComponent', () => {
  let component: RespondentPopupComponent;
  let fixture: ComponentFixture<RespondentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespondentPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
