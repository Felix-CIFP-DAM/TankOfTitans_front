import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidaMapa } from './partida-mapa';

describe('PartidaMapa', () => {
  let component: PartidaMapa;
  let fixture: ComponentFixture<PartidaMapa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartidaMapa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartidaMapa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
