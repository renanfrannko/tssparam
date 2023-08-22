import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';
import { PoDialogService } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', link: '/home' },
    { label: 'Parâmetros', link: '/parametro'}
  ];

  constructor(private poDialog: PoDialogService) {}

  columns = [
    { property: 'entidade'  , label: 'Entidade' , align: 'rigth', readonly: true,  width: 120},
    { property: 'parametro' , label: 'Parâmetro', readonly: true,  width: '200px' },
    { property: 'conteudo'  , label: 'Conteúdo' , align: 'center', readonly: true,  width: 120},
    { property: 'descricao' , label: 'Descrição', align: 'center', readonly: true,  width: 500}
  ];

  data = [
    {
      entidade: '000001',
      parametro: 'MV_AMBIENT',
      conteudo: '2',
      descricao: 'Ambiente de transmissão de NF-e'
    },
    {
      entidade: '000002',
      parametro: 'MV_AMBIENT',
      conteudo: '1',
      descricao: 'Ambiente de transmissão de NF-e'
    },
  ];

  private menuHome() {
    alert('Clicado no menu Home')
  }

  private menuParametros() {
    alert('Clicado no menu Parametros')
  }

  btnFiltrar() {
    this.poDialog.alert({ title: 'PO Button', message: 'Hello PO World!!!' });
  }
    
}
