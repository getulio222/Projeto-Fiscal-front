import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaExclusaoComponent } from './pessoa-exclusao.component';

describe('PessoaExclusaoComponent', () => {
  let component: PessoaExclusaoComponent;
  let fixture: ComponentFixture<PessoaExclusaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PessoaExclusaoComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(PessoaExclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
