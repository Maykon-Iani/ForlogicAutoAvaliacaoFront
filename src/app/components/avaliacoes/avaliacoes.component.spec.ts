import { ComponentFixture, TestBed } from '@angular/core/testing';

import {AvaliacoesComponent } from './avaliacoes.component';

describe('PessoasComponent', () => {
  let component: AvaliacoesComponent;
  let fixture: ComponentFixture<AvaliacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvaliacoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
