import { TestBed } from '@angular/core/testing';

import { CadastroReceitaService } from './cadastro-receita.service';

describe('CadastroReceitaService', () => {
  let service: CadastroReceitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroReceitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
