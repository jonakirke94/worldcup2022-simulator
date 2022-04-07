import React from "react";
import PropTypes from "prop-types";

import GroupItem from "../components/groupItem";

// eslint-disable-next-line no-unused-vars
function Group({ group, teams }) {
  return (
    <div key={group} className="rounded-md border border-gray-300">
      <div className="bg-gray-100 rounded-t-md py-1.5">
        <h3 className="text-lg font-semibold">Group {group}</h3>
      </div>

      <ul>
        {teams.map(({ name, code, placement }) => {
          return (
            <GroupItem
              key={code}
              code={code}
              name={name}
              placement={placement}
            ></GroupItem>
          );
        })}
      </ul>
    </div>
  );
}

Group.propTypes = {
  group: PropTypes.string.isRequired,
  teams: PropTypes.array.isRequired,
};

export default Group;
