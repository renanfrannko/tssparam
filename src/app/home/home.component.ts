import { Component } from '@angular/core';

import { PoBreadcrumb} from '@po-ui/ng-components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/home' }, { label: '' }]
  };

}
