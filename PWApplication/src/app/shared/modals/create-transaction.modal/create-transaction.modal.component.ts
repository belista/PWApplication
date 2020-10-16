import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transaction } from '../../models/transaction.model';
import { User } from '../../models/user.model';
import { CrudService } from '../../services/crud.service';
import { LocalStorageService } from '../../services/storage.service';

@Component({
  selector: 'app-create-transaction.modal',
  templateUrl: './create-transaction.modal.component.html',
  styleUrls: ['./create-transaction.modal.component.css']
})
export class CreateTransactionModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private dialogRef: MatDialogRef<CreateTransactionModalComponent>,
    private crud: CrudService, 
    private formBuilder: FormBuilder,
    private store: LocalStorageService) {
      this.formTransactionData = this.formBuilder.group({
        transaction: [null],
        name: [null, [Validators.required]],
        amount: [null, [Validators.required, Validators.max(data.user.balance), Validators.min(1)]]
      });
    }

  public formTransactionData: FormGroup;
  public users: Array<User>;
  public transactions: Array<Transaction>;
  public selectedTransactionId = null;

  ngOnInit(): void {
    this.transactions = this.store.getTransactions();

    this.crud.post<Array<User>>("/api/protected/users/list", { filter: " " }).subscribe((data: any) => {
      this.users = data;
    });
  }

  createTransaction() {

    let formData = this.formTransactionData.getRawValue();

    this.crud.post<Transaction>("/api/protected/transactions", { name: formData.name, amount: formData.amount }).subscribe((data: any) => {
      this.transactions.unshift(data.trans_token);
      this.store.setTransactions(this.transactions);
      this.data.user.balance = this.data.user.balance - Math.abs(data.trans_token.amount)
      this.dialogRef.close();
    });
  }

  transactionChanged(id: any) {
    if(this.selectedTransactionId === id) {
      return;
    }

    this.selectedTransactionId = id;
    let currentTransaction = this.transactions.filter(e => e.id == id)[0];
    this.formTransactionData.setValue({ name: currentTransaction.username, amount: Math.abs(currentTransaction.amount), transaction: id });
  }
}
