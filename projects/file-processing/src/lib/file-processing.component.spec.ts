import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileProcessingComponent } from './file-processing.component';

describe('FileProcessingComponent', () => {
  let component: FileProcessingComponent;
  let fixture: ComponentFixture<FileProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileProcessingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
