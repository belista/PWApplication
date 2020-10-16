import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../shared/services/crud.service';
import { LocalStorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private crud: CrudService;
  private store: LocalStorageService;

  public formLoginData: FormGroup;
  public formRegisterData: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private crudService: CrudService, 
    private storeService: LocalStorageService,
    private router: Router) {
    this.formLoginData = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });

    this.formRegisterData = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      username: [null, [Validators.required]]
    });

    this.crud = crudService;
    this.store = storeService;
   }

  ngOnInit(): void {
  }

  public login() {
    this.crud.post("/sessions/create", this.formLoginData.getRawValue()).subscribe((data: any) => {
      this.store.setToken(data.id_token);
      this.router.navigate([""]);
    });
  }

  public register() {
    this.crud.post("/users", this.formRegisterData.getRawValue()).subscribe((data: any) => {
      this.store.setToken(data.id_token);
      this.router.navigate([""]);
    });
  }
}
