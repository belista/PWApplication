import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { CreateTransactionModalComponent } from '../shared/modals/create-transaction.modal/create-transaction.modal.component';
import { MainComponent } from './main.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [MainComponent, CreateTransactionModalComponent],
  imports: [
    MainRoutingModule,
    SharedModule
  ],
  exports: [MainComponent],
  providers: [

  ]
})
export class MainModule {}
