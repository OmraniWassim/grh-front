import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { TranslationService } from '../service/Translation.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
  [x: string]: any;
  model: any[] = [];
  title1!: string;
  title2!: string;
  languageChangedSubscription: Subscription;

  constructor(
    public layoutService: LayoutService,
    private translate: TranslateService,
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef
  ) {
    this.translate.setDefaultLang('fr');
    this.languageChangedSubscription = this.translationService.languageChanged.subscribe(() => {
      if (this.initialTranslationsLoaded) {
        this.updateTranslations();
      }
    });

    this.translate.get(['CollabList', 'CollabAdd']).subscribe((translations: { [key: string]: string }) => {
      this.title1 = translations['CollabList'];
      this.title2 = translations['CollabAdd'];
      this.initialTranslationsLoaded = true;
      this.updateTranslations();
    });
  }



  ngOnInit() {

    this.updateTranslations();
  }

  private updateTranslations(): void {
    this.translate.get(['CollabList', 'CollabAdd']).subscribe((translations: { [key: string]: string }) => {
      this.title1 = translations['CollabList'];
      this.title2 = translations['CollabAdd'];

      this.model = [
        {
          label: 'Home',
          items: [
            { label: this.title1, icon: 'pi pi-fw pi-home', routerLink: ['/collaborateurs'] },
            { label: this.title2, icon: 'pi pi-fw pi-pencil', routerLink: ['/add-collaborateur'] },
          ],
        },
      ];

      this.cdr.detectChanges();
    });
  }

}
