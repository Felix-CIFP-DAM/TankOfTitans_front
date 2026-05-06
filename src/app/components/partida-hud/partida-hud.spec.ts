import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidaHud } from './partida-hud';

describe('PartidaHud', () => {
  let component: PartidaHud;
  let fixture: ComponentFixture<PartidaHud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartidaHud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartidaHud);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
