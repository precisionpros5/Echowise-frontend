import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingUsersDialogComponent } from './existing-users-dialog.component';

describe('ExistingUsersDialogComponent', () => {
  let component: ExistingUsersDialogComponent;
  let fixture: ComponentFixture<ExistingUsersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExistingUsersDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExistingUsersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
