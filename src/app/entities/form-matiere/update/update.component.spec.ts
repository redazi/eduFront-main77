import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormMatiereUpdateComponent } from './update.component';



describe('UpdateComponent', () => {
  let component: FormMatiereUpdateComponent;
  let fixture: ComponentFixture<FormMatiereUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMatiereUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMatiereUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
