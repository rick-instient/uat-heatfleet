import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  breadCrumbsList!: Array<{ title: String, url: String }>
  constructor() { }
}
