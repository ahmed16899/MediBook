import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public translate: TranslateService) { }
  dir='ltr';
  ngOnInit(): void {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');
    /*const html = document.getElementById('html');
    const c = document.getElementById('c');
    const language = document.getElementById('language');
    //console.log(language.value)
    c?.addEventListener('click',function(){
      if(html?.dir=='rtl')
      {
        //html?.dir='ltr';
        html.dir="ltr"
      }
      else
      {
        html!.dir="rtl"
      }
    })
    language?.addEventListener('select', (event) => {
      console.log(event)
    });*/


  }
  changeDir(value:any){
    console.log(value)
    const html = document.getElementById('html');
    if(value=='en')
      {
        //html?.dir='ltr';
        html!.dir="ltr"
        //this.dir='ltr'
      }
      else
      {
        html!.dir="rtl"
        //this.dir='rtl'

      }
  }

}
