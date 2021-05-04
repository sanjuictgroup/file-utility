import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileProcessingUnitComponent } from './file-processing-unit.component';

describe('FileProcessingComponent', () => {
  let component: FileProcessingUnitComponent;
  let fixture: ComponentFixture<FileProcessingUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileProcessingUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileProcessingUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
