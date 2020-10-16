import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CreateTransactionModalComponent } from '../shared/modals/create-transaction.modal/create-transaction.modal.component';
import { Transaction } from '../shared/models/transaction.model';
import { User } from '../shared/models/user.model';
import { CrudService } from '../shared/services/crud.service';
import { LocalStorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  public user: User = { id: 0, name: "", email: "", balance: 0 };
  public transactions: MatTableDataSource<Transaction>;
  public displayedColumns: string[] = ["date", "username", "amount", "balance"];


  constructor(
    private crud: CrudService, 
    private dialog: MatDialog, 
    private store: LocalStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.crud.get<User>("/api/protected/user-info").subscribe((data: any) => {
      this.user = data.user_info_token;
    });

    this.crud.get<Array<Transaction>>("/api/protected/transactions").subscribe((data: any) => {
      let reversedData = data.trans_token.reverse();
      this.store.setTransactions(reversedData);
      this.transactions = new MatTableDataSource(reversedData);
    });
  }

  openDialog() {
    let dialog = this.dialog.open(CreateTransactionModalComponent, {
      data: {
        user: this.user
      }
    });

    dialog.afterClosed().subscribe(e => {
      this.transactions.data = this.store.getTransactions();
      this.user.balance = dialog.componentInstance.data.user.balance;
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.transactions.filter = filterValue.trim().toLowerCase();
  }

  sortData(sort: Sort) {

    this.transactions.data = this.transactions.data.reverse();
  }

  logout() {
    this.store.setToken("");
    this.router.navigate(["/login"]);
  }
}