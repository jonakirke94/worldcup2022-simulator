import React, { useState, useEffect, useRef } from "react";

import { TournamentSimulator } from "../../lib/simulators/tournamentSimulator";

import { BracketRenderer } from "../../lib/bracketRenderer";

import Layout from "../components/layout";
import BaseAlert from "../components/base/baseAlert";
import Brackets from "../components/brackets";
import GroupList from "../components/groupList";
import ButtonActionList from "../components/buttonActionList";
import SectionHeading from "../components/sectionHeading";

import { generateDocumentTitle } from "../helpers/titleHelper";

import rawGroups from "../content/groups.json";

const tournamentSimulator = new TournamentSimulator();
const bracketEl = "brackets";

function IndexPage() {
  const [groups, setGroups] = useState(rawGroups);
  const [hasSimulatedGroups, setHasSimulatedGroups] = useState(false);
  const [hasSimulatedPlayoffs, setHasSimulatedPlayoffs] = useState(false);

  useEffect(() => {
    document.title = generateDocumentTitle(
      hasSimulatedGroups,
      hasSimulatedPlayoffs
    );
  });

  const tournamentSection = useRef(null);
  const groupSection = useRef(null);

  function onSimluateGroups() {
    const groupsWithPlacements = tournamentSimulator.simulateGroups(groups);

    setGroups(groupsWithPlacements);
    setHasSimulatedGroups(true);

    process.nextTick(() => {
      groupSection.current.scrollIntoView({ behavior: "smooth" });
    });
  }

  function _simulatePlayOffs() {
    const tournamentTree = tournamentSimulator.simulatePlayoffs();
    const bracketRenderer = new BracketRenderer(bracketEl, 710, 800);
    bracketRenderer.render(tournamentTree);
  }

  function onSimluatePlayoffs() {
    setHasSimulatedPlayoffs(true);

    process.nextTick(_simulatePlayOffs);

    process.nextTick(() => {
      tournamentSection.current.scrollIntoView({ behavior: "smooth" });
    });
  }

  function onResimulateGroups() {
    // In case the user is resetting the groups and playoffs have been simulated
    setHasSimulatedPlayoffs(false);

    const groupsWithPlacements = tournamentSimulator.simulateGroups(rawGroups);
    setGroups(groupsWithPlacements);
  }

  function onResimulatePlayOffs() {
    setHasSimulatedPlayoffs(false);

    process.nextTick(() => setHasSimulatedPlayoffs(true));
    process.nextTick(_simulatePlayOffs);
  }

  function onResetSimulator() {
    setGroups(rawGroups);
    setHasSimulatedGroups(false);
    setHasSimulatedPlayoffs(false);

    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
    <Layout>
      <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-left md:mb-10 mb-8">
        World Cup 2022 Simulator
      </h1>

      <section className="mb-4">
        <BaseAlert title="Ongoing qualification">
          <ul className="ml-6 mt-2 list-disc">
            <li>
              Wales, Scotland and Ukraine are still competing for the remaining
              spot in Group B
            </li>
            <li>
              New Zealand and Costa Rica are still competing for the remaining
              spot in Group E
            </li>
            <li>
              Peru, Australia and Saudi Arabia are still competing for the
              remaining spot in Group C
            </li>
          </ul>
        </BaseAlert>
      </section>

      <section className="text-center" ref={groupSection}>
        <SectionHeading
          title={"Groups"}
          supportingTitle={"32 total teams"}
          resetHandler={onResimulateGroups}
          resetTitle="Resimulate groups"
        ></SectionHeading>
        <GroupList groups={groups}></GroupList>

        <div className="mt-8">
          <ButtonActionList
            buttons={[
              {
                title: "Simulate groups",
                handler: onSimluateGroups,
                isVisible: !hasSimulatedGroups && !hasSimulatedPlayoffs,
                isDisabled: false,
              },
            ]}
          ></ButtonActionList>
        </div>
      </section>

      <section ref={tournamentSection} className="mt-4">
        {
          <SectionHeading
            title={"Playoff results"}
            supportingTitle={"round of 16 to final"}
            resetHandler={onResimulatePlayOffs}
            resetTitle="Resimulate playoffs"
          ></SectionHeading>
        }
        <Brackets
          showEmptyState={hasSimulatedPlayoffs}
          emptyStateClickHandler={onSimluatePlayoffs}
          emptyStateHandlerDisabled={!hasSimulatedGroups}
          id={bracketEl}
        ></Brackets>
      </section>

      <section className="mt-8 text-center">
        {
          <ButtonActionList
            buttons={[
              {
                title: "Simulate playoffs",
                handler: onSimluatePlayoffs,
                isVisible: hasSimulatedGroups && !hasSimulatedPlayoffs,
                isDisabled: false,
              },
              {
                title: "Reset simulator",
                handler: onResetSimulator,
                isVisible: hasSimulatedPlayoffs,
                isDisabled: false,
              },
            ]}
          ></ButtonActionList>
        }
      </section>
    </Layout>
  );
}

export default IndexPage;
