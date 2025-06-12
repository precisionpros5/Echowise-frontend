import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiscussionGroupComponent } from './create-discussion-group.component';

describe('CreateDiscussionGroupComponent', () => {
  let component: CreateDiscussionGroupComponent;
  let fixture: ComponentFixture<CreateDiscussionGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDiscussionGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDiscussionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
