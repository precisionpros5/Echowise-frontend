import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourQueriesComponent } from './your-queries.component';

describe('YourQueriesComponent', () => {
  let component: YourQueriesComponent;
  let fixture: ComponentFixture<YourQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourQueriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
