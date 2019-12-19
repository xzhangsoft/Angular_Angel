import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowContainerComponent } from './flow-container.component';

describe('FlowContainerComponent', () => {
  let component: FlowContainerComponent;
  let fixture: ComponentFixture<FlowContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
