import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Database, set, ref, push } from '@angular/fire/database';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-comming-soon-page',
  templateUrl: './comming-soon-page.component.html',
  styleUrls: ['./comming-soon-page.component.scss']
})
export class CommingSoonPageComponent implements OnInit {

  getNotifiedForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  constructor(private database: Database,
    private toast: HotToastService) { }

  comingDate: any = new Date('Apr 8, 2023 13:12:00')

  d: number = 12;
  h: number = 6;
  m: number = 35;
  s: number = 54;

  ngOnInit(): void {
  }

  get email() {
    return this.getNotifiedForm.get('email');
  }

  submit() {
    const { email } = this.getNotifiedForm.value;

    if (!this.getNotifiedForm.valid || !email) {
      this.email?.setErrors({ 'required': true });
      this.email?.setErrors({ 'email': true });
      this.email?.markAsTouched();
      return;
    }

    const postListRef = ref(this.database, 'users/');
    const newPostRef = push(postListRef);

    set(newPostRef, {
      userEmail: email
    }).then(() => {
      this.toast.show('Email Saved Successfully', { duration: 3000 })
    }).catch((error) => {
      this.toast.show(error, { duration: 5000 })
      console.log('******????ERrror')
    });

  }

  x = setInterval(() => {
    let now = new Date()
    let selisih = this.comingDate.getTime() - now.getTime()

    let days = Math.floor(selisih / (1000 * 60 * 60 * 24))
    let hours = Math.floor(selisih % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
    let minutes = Math.floor(selisih % (1000 * 60 * 60) / (1000 * 60))
    let seconds = Math.floor(selisih % (1000 * 60) / 1000)

    this.d = days;
    this.h = hours;
    this.m = minutes;
    this.s = seconds;

    if (selisih < 0) {
      clearInterval(this.x)
      this.d = 0;
      this.h = 0;
      this.m = 0;
      this.s = 0;
    }
  }, 1000)

}
