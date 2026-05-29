import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaAlteracaoComponent } from './pessoa-alteracao.component';

describe('PessoaAlteracaoComponent', () => {
  let component: PessoaAlteracaoComponent;
  let fixture: ComponentFixture<PessoaAlteracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PessoaAlteracaoComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(PessoaAlteracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
