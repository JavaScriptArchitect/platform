import { Component, HostBinding } from '@angular/core';
import { SideMenusService } from '../side-menus.service';

@Component({
  selector: 'app-search-menu',
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.scss']
})
export class SearchMenuComponent {
  @HostBinding('class.actions-on-top') topActions = true;

  constructor(
    private sideMenusService: SideMenusService
  ) { }

  closeAltMenu(): void {
    this.sideMenusService.toggleAltMenuSubject.next('close');
  }
}
