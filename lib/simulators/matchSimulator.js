export class MatchSimulator {
  simulate(game) {
    const { teamA, teamB } = game;
    const winner = Math.random() >= 0.5 ? teamA : teamB;
    return winner;
  }
}
