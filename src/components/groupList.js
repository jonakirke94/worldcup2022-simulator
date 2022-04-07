import React from "react";
import PropTypes from "prop-types";

import Group from "../components/group";

function GroupList({ groups }) {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-2 gap-4">
      {groups.map(({ group, teams }) => {
        return <Group key={group} group={group} teams={teams} />;
      })}
    </div>
  );
}

GroupList.propTypes = {
  groups: PropTypes.array.isRequired,
};

export default GroupList;
