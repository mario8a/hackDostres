import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  // // tagId: any;

  constructor(private nfc: NFC, private ndef: Ndef, public toastController: ToastController) { }

  ngOnInit() {
    // this.tagId = this.addListenNFC();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Nel jjajaja',
      duration: 2000
    });
    toast.present();
  }

  // async presentToastsi() {
  //   const toast = await this.toastController.create({
  //     message: "si",
  //     duration: 2000
  //   });
  //   toast.present();
  // }

  // addListenNFC() {
  //   console.log('entra a addListenNFC');

  //   this.nfc.addNdefListener(() => {
  //     console.log('successfully attached ndef listener');
  //   }, (err) => {
  //     console.log('error attaching ndef listener', err);

  //   this.presentToast();

  //   }).subscribe((event) => {
  //     console.log('received ndef message. the tag contains: ', event.tag);
  //     console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));

  //     this.presentToastsi();
  //   });

  // }

  // NFC IONIC 4



  onClick() {

    this.nfc.beginSession().subscribe(res => {
      this.nfc.addNdefListener(() => {
        console.log('successfully attached ndef listener');
      }, (err) => {
        console.log('error attaching ndef listener', err);
        this.presentToast();
      }).subscribe((event) => {
        console.log('received ndef message. the tag contains: ', event.tag);
        console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));
        this.presentToast();
      });
    },
      err => {
      console.log(err);
      });
  }

}
