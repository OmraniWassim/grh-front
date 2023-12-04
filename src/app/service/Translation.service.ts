// translation.service.ts
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  languageChanged = new Subject<string>();

  constructor(private translate: TranslateService) {}

  switchLanguage(lang: string): void {
    this.translate.use(lang);
    this.languageChanged.next(lang);
    
  }
}
