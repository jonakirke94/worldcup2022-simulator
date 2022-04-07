import { MatchSimulator } from "./matchSimulator";
import { Tree } from "../tree";
import { TreeNode } from "../treeNode";

export class PlayOffSimulator {
  constructor() {
    this.matchSimulator = new MatchSimulator();
  }

  simulate(roundOf16Games) {
    const leafNodes =
      PlayOffSimulator.turnRoundOf16IntoLeafNodes(roundOf16Games);

    return this._buildTournamentTree(roundOf16Games, leafNodes);
  }

  static turnRoundOf16IntoLeafNodes(roundOf16Games) {
    return roundOf16Games.map((game) => {
      return TreeNode.newLeafNode({
        ...game,
        depth: 0,
      });
    });
  }

  _buildTournamentTree(roundOf16, nodes) {
    const tournamentTree = new Tree();

    const makeTreeRecursively = (games, nodes, depth) => {
      const nextGames = [];

      const nextDepthNodes = [];

      if (games.length === 1) {
        const rootNode = nodes[0];

        rootNode.data.tournamentWinner = this.matchSimulator.simulate(
          rootNode.data
        );
        tournamentTree.insertRoot(rootNode);
        return tournamentTree;
      }

      for (let index = 0; index < games.length; index += 2) {
        const winner1 = this.matchSimulator.simulate(games[index]);
        const winner2 = this.matchSimulator.simulate(games[index + 1]);

        const nextRoundGame = {
          teamA: winner1,
          teamB: winner2,
          depth,
        };

        // we are in n +1 iteration and must backfill the ancestor leafnode
        const leftAncestor = TreeNode.findAncestor(nodes, winner1);
        const rightAncestor = TreeNode.findAncestor(nodes, winner2);

        const node = new TreeNode(nextRoundGame, leftAncestor, rightAncestor);
        nextDepthNodes.push(node);

        nextGames.push(nextRoundGame);
      }

      return makeTreeRecursively(nextGames, nextDepthNodes, depth + 1);
    };

    const initialDepth = 1;
    return makeTreeRecursively(roundOf16, nodes, initialDepth);
  }
}
