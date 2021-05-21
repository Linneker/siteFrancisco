import { TestBed } from '@angular/core/testing';

import { CadastroDespesaService } from './cadastro-despesa.service';

describe('CadastroDespesaService', () => {
  let service: CadastroDespesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroDespesaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
