import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../service/Translation.service';
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
  countries: { name: string; code: string; }[] | undefined;

    constructor(public layoutService: LayoutService,private translateService: TranslateService,private translationService:TranslationService) {
      translateService.addLangs(["en","fr"]);
      translateService.setDefaultLang("fr");
     }
     switchLang(lang: string): void {
      this.translationService.switchLanguage(lang);
    }
    ngOnInit(){
      this.countries = [
        { name: 'France', code: 'FR' },
        { name: 'United States', code: 'US' }
    ];
    }
}
