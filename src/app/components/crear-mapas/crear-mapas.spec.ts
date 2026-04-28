import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMapas } from './crear-mapas';

describe('CrearMapas', () => {
  let component: CrearMapas;
  let fixture: ComponentFixture<CrearMapas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearMapas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearMapas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
