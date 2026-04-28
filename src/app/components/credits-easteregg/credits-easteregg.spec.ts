import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsEasteregg } from './credits-easteregg';

describe('CreditsEasteregg', () => {
    let component: CreditsEasteregg;
    let fixture: ComponentFixture<CreditsEasteregg>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreditsEasteregg]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CreditsEasteregg);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});