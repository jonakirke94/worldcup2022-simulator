import { GroupSimulator } from "./groupSimulator";
import { PlayOffSimulator } from "./playoffSimulator";

export class TournamentSimulator {
  constructor() {
    this.groupSimulator = new GroupSimulator();
    this.playoffSimulator = new PlayOffSimulator();
  }

  simulateGroups(groups) {
    return this.groupSimulator.simulate(groups);
  }

  simulatePlayoffs() {
    const roundOf16Games = this.groupSimulator.buildRoundOf16();
    return this.playoffSimulator.simulate(roundOf16Games);
  }
}
