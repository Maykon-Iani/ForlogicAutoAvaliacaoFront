import { ClientesService } from '../../clientes/services/clientes.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Cliente } from '../../clientes/models/Cliente';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  formulario: any;
  tituloFormulario!: string;
  clientes!: Cliente[];
  nomeCliente!: string;
  id!: number;
  searchText!: string;
  categoria!: string;
  createdAt!: string;
  updatedAt!: string;

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false; 
  
  modalRef!: BsModalRef;

  constructor(private clientesService: ClientesService,
    private modalService: BsModalService) {}

  ngOnInit(): void {
    this.clientesService.GetClientes().subscribe((resultado) => {
      this.clientes = resultado;
    });
  }

  ExibirFormularioCadastro(): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = 'Novo Cliente';
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      nome_contato: new FormControl(null),
      cnpj: new FormControl(null),
    });
  }

  ExibirFormularioAtualizacao(id: number): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.clientesService.GetCliente(id).subscribe((resultado) => {
      this.tituloFormulario = `Atualizar dados do cliente ${resultado.nome}`;

      this.formulario = new FormGroup({
        id: new FormControl(resultado.id),
        nome: new FormControl(resultado.nome),
        nome_contato: new FormControl(resultado.nome_contato),
        cnpj: new FormControl(resultado.cnpj),
        categoria: new FormControl(resultado.categoria),
        createdAt:new FormControl(resultado.createdAt),
        updatedAt:new FormControl(resultado.updatedAt),
      });
    });
  }

  EnviarFormulario(): void {
    const cliente: Cliente = this.formulario.value;

    if (cliente.id > 0) {
      this.clientesService.PutCliente(cliente).subscribe((resultado) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Cliente atualizada com sucesso');
        this.clientesService.GetClientes().subscribe((registros) => {
          this.clientes = registros;
        });
      });
    } else {
      this.clientesService.PostCliente(cliente).subscribe((resultado) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Cliente inserido com sucesso');
        this.clientesService.GetClientes().subscribe((registros) => {
          this.clientes = registros;
        });
      });
    }
  }

  Voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  ExibirConfirmacaoExclusao(id: number, nomeCliente: string, conteudoModal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(conteudoModal);
    this.id = id;
    this.nomeCliente = nomeCliente;
  }

  ExcluirCliente(id: number){
    this.clientesService.DeleteCliente(id).subscribe(resultado => {
      this.modalRef.hide();
      alert('Pessoa excluída com sucesso');
      this.clientesService.GetClientes().subscribe(registros => {
        this.clientes = registros;
      });
    });
  }
}
