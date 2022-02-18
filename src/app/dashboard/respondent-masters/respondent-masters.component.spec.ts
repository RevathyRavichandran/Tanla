import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondentMastersComponent } from './respondent-masters.component';

describe('RespondentMastersComponent', () => {
  let component: RespondentMastersComponent;
  let fixture: ComponentFixture<RespondentMastersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespondentMastersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondentMastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
