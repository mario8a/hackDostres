import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  tagId: string;

  constructor(private nfc: NFC, private ndef: Ndef, public toastController: ToastController) { }

  ngOnInit() {
    this.nfc.addNdefListener(() => {
      alert('successfully attached ndef listener');
    }, (err) => {
      alert('error attaching ndef listener', err);
    }).subscribe((event) => {
      console.log('received ndef message. the tag contains: ', event.tag);
      console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));
    
      let message = this.ndef.textRecord('Hello world');
      this.nfc.share([message]).then(onSuccess).catch(onError);
    });
    
  }
}
