/* eslint-disable no-debugger */
export class TreeNode {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }

  static newLeafNode(data) {
    return new TreeNode(data, null, null);
  }

  static findAncestor(leafNodes, winner) {
    return leafNodes.find(
      (x) => x.data.teamA === winner || x.data.teamB === winner
    );
  }
}
