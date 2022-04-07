export class GroupSimulator {
  constructor() {
    this.groupResults = [];
    this.groupAdvancements = [];
  }

  simulate(groups) {
    this.groupResults = groups.map(({ group, teams }) => {
      return {
        group,
        teams: teams
          .map((team) => {
            return {
              ...team,
              score: Math.random(),
              group,
            };
          })
          .sort((a, b) => a.score - b.score)
          .map((team, index) => {
            return {
              ...team,
              placement: index + 1,
              group,
            };
          }),
      };
    });

    return this.groupResults;
  }

  _buildGroupAdvancements() {
    if (!this.groupResults.length) {
      throw new Error(
        "Cannot determine group advancements before the group has been simulated"
      );
    }

    return this.groupResults.map(({ group, teams }) => {
      return {
        group,
        teams: teams.filter(
          ({ placement }) => placement == 1 || placement == 2
        ),
      };
    });
  }

  buildRoundOf16() {
    const groupAdvancements = this._buildGroupAdvancements();

    return [
      {
        teamA: groupAdvancements[0].teams[0],
        teamB: groupAdvancements[1].teams[1],
      },
      {
        teamA: groupAdvancements[2].teams[0],
        teamB: groupAdvancements[3].teams[1],
      },
      {
        teamA: groupAdvancements[0].teams[1],
        teamB: groupAdvancements[1].teams[0],
      },
      {
        teamA: groupAdvancements[2].teams[1],
        teamB: groupAdvancements[3].teams[0],
      },
      {
        teamA: groupAdvancements[4].teams[0],
        teamB: groupAdvancements[5].teams[1],
      },
      {
        teamA: groupAdvancements[6].teams[0],
        teamB: groupAdvancements[7].teams[1],
      },
      {
        teamA: groupAdvancements[4].teams[1],
        teamB: groupAdvancements[5].teams[0],
      },
      {
        teamA: groupAdvancements[6].teams[1],
        teamB: groupAdvancements[7].teams[0],
      },
    ];
  }
}
