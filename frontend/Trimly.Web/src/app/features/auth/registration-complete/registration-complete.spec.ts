import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComplete } from './registration-complete';

describe('RegistrationComplete', () => {
  let component: RegistrationComplete;
  let fixture: ComponentFixture<RegistrationComplete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationComplete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationComplete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
