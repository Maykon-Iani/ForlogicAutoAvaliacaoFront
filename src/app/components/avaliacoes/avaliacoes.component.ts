import { AvaliacoesService } from '../../avaliacoes/services/avaliacoes.service';
import { ClientesService } from '../../clientes/services/clientes.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Avaliacao } from '../../avaliacoes/models/Avaliacao';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as moment from 'moment';

@Component({
  selector: 'app-avaliacoes',
  templateUrl: './avaliacoes.component.html',
  styleUrls: ['./avaliacoes.component.css'],
})
export class AvaliacoesComponent implements OnInit {
  formulario: any;
  tituloFormulario!: string;
  avaliacoes!: Avaliacao[];
  id!: number;
  searchText!: string;
  
  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false; 
  
  modalRef!: BsModalRef;

  constructor(private avaliacoesService: AvaliacoesService,
    private clientesService: ClientesService,
    private modalService: BsModalService) {}

  ngOnInit(): void {
    this.avaliacoesService.GetAvaliacoes().subscribe((resultado) => {
      this.avaliacoes = resultado;
    });

  }

  listClientes: any = this.clientesService.GetClientesByName().subscribe((resultado) => {
    this.listClientes = resultado;
  });

  changeFormClienteId(value:string) {
    this.formulario.value.id_cliente = value;
  }
  
  ExibirFormularioCadastro(): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = 'Nova Avaliação';
    this.formulario = new FormGroup({
        mes_ano: new FormControl(null),
        nota: new FormControl(null),
        motivo: new FormControl(null),
        id_cliente: new FormControl(''),
    });
  }

  ExibirFormularioAtualizacao(id: number): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.avaliacoesService.GetAvaliacao(id).subscribe((resultado) => {
      this.tituloFormulario = `Atualizar dados da avaliação`;

       resultado.mes_ano = moment(resultado.mes_ano).format('DD/MM/YYYY');

      this.formulario = new FormGroup({
        id: new FormControl(resultado.id),
        mes_ano: new FormControl(resultado.mes_ano),
        nota: new FormControl(resultado.nota),
        motivo: new FormControl(resultado.motivo),
        id_cliente: new FormControl(resultado.id_cliente),
        createdAt:new FormControl(resultado.createdAt),
        updatedAt:new FormControl(resultado.updatedAt),
      });
    });
  }

  EnviarFormulario(): void {
    const avaliacao: Avaliacao = this.formulario.value;

    if (avaliacao.id > 0) {
      this.avaliacoesService.PutAvaliacao(avaliacao).subscribe((resultado) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Avaliação atualizada com sucesso');
        this.avaliacoesService.GetAvaliacoes().subscribe((registros) => {
          this.avaliacoes = registros;
        });
      });
    } else {
      this.avaliacoesService.PostAvaliacao(avaliacao).subscribe((resultado) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Avaliação inserido com sucesso');
        this.avaliacoesService.GetAvaliacoes().subscribe((registros) => {
          this.avaliacoes = registros;
        });
      });
    }
  }

  Voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  ExibirConfirmacaoExclusao(id: number, conteudoModal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(conteudoModal);
    this.id = id;
  }

  ExcluirAvaliacao(id: number){
    this.avaliacoesService.DeleteAvaliacao(id).subscribe(resultado => {
      this.modalRef.hide();
      alert('Avaliação excluída com sucesso');
      this.avaliacoesService.GetAvaliacoes().subscribe(registros => {
        this.avaliacoes = registros;
      });
    });
  }

 
}
