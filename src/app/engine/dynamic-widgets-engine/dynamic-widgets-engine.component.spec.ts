import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicWidgetsEngineComponent } from './dynamic-widgets-engine.component';

describe('DynamicWidgetsEngineComponent', () => {
  let component: DynamicWidgetsEngineComponent;
  let fixture: ComponentFixture<DynamicWidgetsEngineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicWidgetsEngineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicWidgetsEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
