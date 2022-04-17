import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';

export interface TreeNode {
  name: string;
  children?: TreeNode[];
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent {

  @Input() set data(val: TreeNode[]) {
    this.dataSource.data = val;
  }

  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();

  constructor() { }

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;
}
