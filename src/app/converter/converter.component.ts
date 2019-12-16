import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {

  title = 'currencyconverter';
  currencies: any;
  currencyForm: FormGroup;
  result = 0;
  error = '';
  apiData: any;
  loading = true;
  constructor(private http: HttpClient, private fb: FormBuilder) {

  }
  form() {
    return this.currencyForm.controls;
  }
  convert(): any {
    const toCurrencyValue = this.currencies[this.form().to.value];
    console.log('convert');
    console.log(toCurrencyValue);
    this.result = toCurrencyValue * this.form().amount.value;
  }
  FromCurrencyChange(currency) {
    this.loading = true;
    console.log('currency convert');
    this.getApiData(currency);
    console.log(currency);
  }
  ToCurrencyChange() {
    this.convert();
  }

  getApiData(baseCurrency = 'USD') {
    this.http.get(environment.api + 'latest?base=' + baseCurrency).subscribe({
      next: (res) => {
        this.apiData = res;
        this.currencies = this.apiData.rates;
        this.convert();
        this.loading = false;
      },
      error: (error) => { this.error = error; }
    });
  }

  ngOnInit() {
    this.currencyForm = this.fb.group({
      from: ['USD', Validators.required],
      to: ['AUD', Validators.required],
      amount: ['1', Validators.required],
    });
    this.getApiData('USD');
  }

}
