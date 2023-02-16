import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  text: string = 'Placeholder';
  lorem: any = {
    ipsum: 'Lorem ipsum'
  };

  subscription: Subscription;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isEditable = false;

  constructor(private _formBuilder: FormBuilder, private http: HttpClient) {
    this.subscription = this.getHelloWorld().subscribe((text: string) => {
      this.text = text;
    });
  }

  private getHelloWorld(): Observable<string> {
    return this.http.get<string>('https://localhost:44372/content/helloworld', { responseType: 'json' });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
