import {Injectable} from '@angular/core';
import { AppModule } from 'src/app/app.module';
import { Transaction } from '../models/transaction.model';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    public getToken() {
        return localStorage.getItem("token");
    }

    public setToken(token: string) {
        localStorage.setItem("token", token);
    }

    public getTransactions() {
        let json = localStorage.getItem("transactions");
        return JSON.parse(json);
    }

    public setTransactions(transactions: Array<Transaction>) {
        var json = JSON.stringify(transactions);
        localStorage.setItem("transactions", json);
    }
}