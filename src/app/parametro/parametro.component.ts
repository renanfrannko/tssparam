import { Component, ViewChild } from '@angular/core';

import { PoBreadcrumb, PoDynamicViewField, PoModalComponent } from '@po-ui/ng-components';

import {
  PoPageDynamicTableActions,
  PoPageDynamicTableCustomAction,
  PoPageDynamicTableCustomTableAction,
  PoPageDynamicTableOptions
} from '@po-ui/ng-templates';

import { ParametroService } from './parametro.service';

@Component({
  selector: 'app-parametro',
  templateUrl: './parametro.component.html',
  styleUrls: ['./parametro.component.css'],
  providers: [ParametroService]
})

export class ParametroComponent {

  @ViewChild('userDetailModal') userDetailModal!: PoModalComponent;
  @ViewChild('dependentsModal') dependentsModal!: PoModalComponent;

  readonly serviceApi = 'http://localhost:8090/rest/v1/tssParam/';

  actionsRight = false;
  detailedUser: any;
  dependents: any;
  quickSearchWidth: number = 3;
  fixedFilter = false;

  readonly actions: PoPageDynamicTableActions = {
    new: '/documentation/po-page-dynamic-edit',
    edit: '/edit:id',
    remove: true,
    removeAll: false
  };

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/home' }, { label: 'Parametros' }]
  };

  readonly cityOptions: Array<object> = [
    { value: 'São Paulo', label: 'São Paulo' },
    { value: 'Joinville', label: 'Joinville' },
    { value: 'São Bento', label: 'São Bento' },
    { value: 'Araquari', label: 'Araquari' },
    { value: 'Campinas', label: 'Campinas' },
    { value: 'Osasco', label: 'Osasco' }
  ];

  fields: Array<any> = [
    { property: 'id', key: true, visible: false, filter: true },
    { property: 'name', label: 'Name', filter: true, gridColumns: 6 },
    { property: 'genre', label: 'Genre', filter: true, gridColumns: 6, duplicate: true, sortable: false },
    { property: 'search', filter: true, visible: false },
    {
      property: 'birthdate',
      label: 'Birthdate',
      type: 'date',
      gridColumns: 6,
      visible: false,
      allowColumnsManager: true
    },
    { property: 'city', label: 'City', filter: true, duplicate: true, options: this.cityOptions, gridColumns: 12 }
  ];

  readonly detailFields: Array<PoDynamicViewField> = [
    { property: 'status', tag: true, gridLgColumns: 4, divider: 'Personal Data' },
    { property: 'name', gridLgColumns: 4 },
    { property: 'nickname', label: 'User name', gridLgColumns: 4 },
    { property: 'email', gridLgColumns: 4 },
    { property: 'birthdate', gridLgColumns: 4, type: 'date' },
    { property: 'genre', gridLgColumns: 4, gridSmColumns: 6 },
    { property: 'cityName', label: 'City', divider: 'Address' },
    { property: 'state' },
    { property: 'country' }
  ];

  pageCustomActions: Array<PoPageDynamicTableCustomAction> = [
    /*{
      label: 'Actions Right',
      action: this.onClickActionsSide.bind(this),
      visible: this.isVisibleActionsRight.bind(this),
      icon: 'po-icon-arrow-right'
    },
    {
      label: 'Actions Left',
      action: this.onClickActionsSide.bind(this),
      visible: this.isVisibleActionsLeft.bind(this),
      icon: 'po-icon-arrow-left'
    },
    */
    {
      label: 'Fixed Filter',
      action: this.onClickFixedFilter.bind(this),
      visible: this.isVisibleFixedFilter.bind(this),
      icon: 'po-icon-lock'
    }
    /*,
    {
      label: 'Not Fixed Filter',
      action: this.onClickFixedFilter.bind(this),
      visible: this.isVisibleNotFixedFilter.bind(this),
      icon: 'po-icon-lock-off'
    },
    { label: 'Print', action: this.printPage.bind(this), icon: 'po-icon-print' },
    {
      label: 'Download .csv',
      action: this.usersService.downloadCsv.bind(this.usersService, this.serviceApi),
      icon: 'po-icon-download'
    }*/
  ];

  tableCustomActions: Array<PoPageDynamicTableCustomTableAction> = [
    {
      label: 'Alterar',
      action: this.onClickUserDetail.bind(this),
      disabled: this.isUserInactive.bind(this),
      icon: 'po-icon-user'
    },
    {
      label: 'Excluir',
      action: this.onClickDependents.bind(this),
      visible: true,
      icon: 'po-icon-news'
    }
  ];

  constructor(private usersService: ParametroService) {}

  onLoad(): PoPageDynamicTableOptions {
    return {
      fields: [
        { property: 'id', key: true, visible: true, filter: true },
        { property: 'name', label: 'Name', filter: true, gridColumns: 6 },
        { property: 'genre', label: 'Genre', filter: true, gridColumns: 6, duplicate: true },
        { property: 'search', initValue: 'São Paulo' },
        {
          property: 'birthdate',
          label: 'Birthdate',
          type: 'date',
          gridColumns: 6,
          visible: false,
          allowColumnsManager: true
        }
      ]
    };
  }

  isUserInactive(person: any) {
    return person.status === 'inactive';
  }

  hasDependents(person: any) {
    return person.dependents.length !== 0;
  }

  printPage() {
    window.print();
  }

  private onClickUserDetail(user: any) {
    this.detailedUser = user;

    this.userDetailModal.open();
  }

  private onClickDependents(user: any) {
    this.dependents = user.dependents;

    this.dependentsModal.open();
  }

  private onClickActionsSide(value: any) {
    this.actionsRight = !this.actionsRight;
  }

  private isVisibleActionsRight() {
    return !this.actionsRight;
  }

  private isVisibleActionsLeft() {
    return this.actionsRight;
  }

  private onClickFixedFilter() {
    this.fixedFilter = !this.fixedFilter;
    const fieldsDefault = [...this.fields];

    if (this.fixedFilter) {
      fieldsDefault
        .filter(field => field.property === 'search')
        .map(field => {
          field.initValue = 'Joinville';
          field.filter = true;
          field.fixed = true;
        });

      this.fields = fieldsDefault;
    } else {
      fieldsDefault
        .filter(field => field.property === 'search')
        .map(field => {
          field.initValue = 'São Paulo';
          field.fixed = false;
        });

      this.fields = fieldsDefault;
    }
  }

  private isVisibleFixedFilter() {
    return !this.fixedFilter;
  }

  private isVisibleNotFixedFilter() {
    return this.fixedFilter;
  }
}
