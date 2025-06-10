import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitySidebarComponent } from './community-sidebar.component';

describe('CommunitySidebarComponent', () => {
  let component: CommunitySidebarComponent;
  let fixture: ComponentFixture<CommunitySidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunitySidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunitySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
