import { ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppSpinnerComponent } from './app-spinner.component';
import { OverlayService } from './overlay-service';


class ViewContainerRefMock { }

class OverlayServiceMock {
  positionGloballyCenter() { }
  createOverlay() { return { hasAttached: () => false } }
}

describe('AppSpinnerComponent', () => {
  let component: AppSpinnerComponent;
  let fixture: ComponentFixture<AppSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppSpinnerComponent],
      providers: [
        { provide: ViewContainerRef, useClass: ViewContainerRefMock },
        { provide: OverlayService, useClass: OverlayServiceMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
