import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransaction.ModalComponent } from './create-transaction.modal.component';

describe('CreateTransaction.ModalComponent', () => {
  let component: CreateTransaction.ModalComponent;
  let fixture: ComponentFixture<CreateTransaction.ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTransaction.ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTransaction.ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
