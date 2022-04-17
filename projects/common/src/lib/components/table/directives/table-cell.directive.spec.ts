import { Component, ViewChild } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { TableCellDirective } from './table-cell.directive';

@Component({
  selector: 'my-test-component',
  template: ''
})
class TestComponent {
  @ViewChild(TableCellDirective) dataTableCellDirective?: TableCellDirective;
}

describe('TableCellDirective', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        TableCellDirective
      ]
    });
  });

  it('should be able to test directive', waitForAsync(() => {
    TestBed.overrideComponent(TestComponent, {
      set: {
        template: '<ng-template cellTemplateForColumn="test">test</ng-template>'
      }
    });
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const component = fixture.componentInstance;
      const directive = component.dataTableCellDirective;
      expect(directive).not.toBeNull();
      expect(directive?.templateRef).not.toBeNull();
      expect(directive?.cellTemplateForColumn).toBe('test');
    });
  }));

});
