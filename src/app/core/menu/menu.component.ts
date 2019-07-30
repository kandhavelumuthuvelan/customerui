import { EmitFilterModel } from './../model/ProductFilterModel';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuBusiness } from '../Business/MenuBusiness';
import { ToastrManager } from 'ng6-toastr-notifications';
import { takeUntil } from 'rxjs/operators';
import { MenuModel } from '../model/MenuModel';
import { SharedService } from '../services/SharedService';
import { ViewChild, ElementRef} from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(document:mouseover)': 'onHover($event)'
  }
})
export class MenuComponent implements OnInit, OnDestroy {
  @ViewChild('dropMenu') dropMenu: ElementRef;
  @ViewChild('triggerClick') triggerClick: ElementRef;
  @ViewChild('subDropdown') subDropdown: ElementRef;
  private componetDestroyed: Subject<null> = new Subject();
  public menuGroup: any;
  Menus: MenuModel[];
  testHtml: string;
  html: string;
  constructor(
    private business: MenuBusiness,
    public toastr: ToastrManager,
    private filter: SharedService,
    private _route: Router,
    ) {}

  ngOnInit() {
    this.GetMenus();
  }
  onHover(event) {
    if (!this.dropMenu.nativeElement.contains(event.target)) {
      this.triggerClick.nativeElement.classList.remove('dropdown-is-active');
      this.subDropdown.nativeElement.classList.remove('dropdown-is-active');
    }
  }



  onCategory(key: string): void {
    const data: EmitFilterModel = { source: 'category', key: key};
    this.filter.EmitFilterData(data);
    this._route.navigate(['product-filter/category/' + key]);
  }

  onDiscipline(key: string): void {
    const data: EmitFilterModel = { source: 'discipline', key: key};
    this.filter.EmitFilterData(data);
    this._route.navigate(['product-filter/discipline/' + key]);
  }

  onProduct(key: string): void {
    const data: EmitFilterModel = { source: 'product', key: key};
    this.filter.EmitFilterData(data);
    this._route.navigate(['product-filter/product/' + key]);
  }

  GetMenus() {
    this.business
      .GetMenus()
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe(
        x => {
          this.menuGroup = x;
          this.html = this.buildMenu(x);
          this.testHtml = `<li class ="gh"><a href="#">Procurement<span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Civil</a></li>
            <li><a href="#">Residential</a></li>
            <li><a href="#">Mechanical</a></li>
            <li><a href="#">Electrical</a></li>
            <li><a href="#">Instrument<span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#">Civil</a></li>
                <li><a href="#">Residential</a></li>
                <li><a href="#">Mechanical</a></li>
                <li><a href="#">Electrical</a></li>
                <li><a href="#">Instrument</a></li>
              </ul>
            </li>
          </ul>
        </li>`;
        },
        error => {
          this.toastr.errorToastr('Something went wrong!');
        },
        () => {
          const $menu = $('#test1');

          // append a new main menu item
          $menu.append('<li><a href="#">New item</a></li>');

          // add a sub menu with 3 items to the new main menu item
          $menu
            .children('li:last')
            .append(
              '<ul class="dropdown-menu">\
            <li><a href="#">New item</a></li>\
            <li><a href="#">New item</a></li>\
            <li><a href="#">New item</a></li>\
          </ul>'
            );

          // refresh the menu after the DOM operations
          $menu.smartmenus('refresh');
        }
      );
  }

  buildMenu(menu: MenuModel[]): string {
    let tag = '';
    menu.forEach(data => {
      tag += '<li>';
      tag = tag + '<a href="#">' + data.name;
      if (data.subMenu.length > 0) {
        tag += '<span class="caret"></span>';
      }
      tag += '</a>';
      if (data.subMenu.length > 0) {
        tag += '<ul class="dropdown-menu">';
        tag += this.buildMenu(data.subMenu);
        tag += '</ul>';
      }
      tag = tag + '</li>';
    });
    return tag;
  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }
}
