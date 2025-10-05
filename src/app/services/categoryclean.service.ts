import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryCleanService {

  // Navbar veya başka bir componentten temizleme isteğini yayınlamak için
  private clearCategorySource = new Subject<void>();
  clearCategory$ = this.clearCategorySource.asObservable();

  constructor() { }

  // Temizleme isteğini yayınla
  clean() {
    this.clearCategorySource.next();
  }
}
