import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRoomDialogComponent } from './update-room-dialog.component';

describe('UpdateRoomDialogComponent', () => {
  let component: UpdateRoomDialogComponent;
  let fixture: ComponentFixture<UpdateRoomDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateRoomDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
