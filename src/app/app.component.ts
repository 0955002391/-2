import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IGX_CARD_DIRECTIVES, IGX_NAVBAR_DIRECTIVES, IGX_NAVIGATION_DRAWER_DIRECTIVES, IGX_TABS_DIRECTIVES, IgxButtonDirective, IgxIconButtonDirective, IgxIconComponent, IgxOverlayOutletDirective, IgxRippleDirective, IgxToggleActionDirective, IgxToggleDirective } from 'igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { CategoriesType } from './models/northwind/categories-type';
import { NorthwindService } from './services/northwind.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IGX_NAVIGATION_DRAWER_DIRECTIVES, IGX_NAVBAR_DIRECTIVES, IGX_TABS_DIRECTIVES, IGX_CARD_DIRECTIVES, IgxIconButtonDirective, IgxToggleActionDirective, IgxOverlayOutletDirective, IgxRippleDirective, IgxToggleDirective, IgxIconComponent, IgxButtonDirective, NgIf, RouterLink, NgFor, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public navbarVisible: boolean = false;
  public northwindCategories: CategoriesType[] = [];

  constructor(private northwindService: NorthwindService) { }

  ngOnInit() {
    this.northwindService.getData('CategoriesType').pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.northwindCategories = data,
      error: (_err: any) => this.northwindCategories = []
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
