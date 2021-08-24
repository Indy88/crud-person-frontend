import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonAddUpdateComponent } from './person-add-update.component';

describe('PersonAddUpdateComponent', () => {
  let component: PersonAddUpdateComponent;
  let fixture: ComponentFixture<PersonAddUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonAddUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
