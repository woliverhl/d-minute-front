import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectByIdComponent } from './project-by-id.component';

describe('ProjectByIdComponent', () => {
  let component: ProjectByIdComponent;
  let fixture: ComponentFixture<ProjectByIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectByIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
