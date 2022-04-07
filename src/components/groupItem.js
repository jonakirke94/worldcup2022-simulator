import React from "react";
import PropTypes from "prop-types";

import ReactCountryFlag from "react-country-flag";

// eslint-disable-next-line no-unused-vars
function GroupItem({ name, code, placement }) {
  const advancesFromGroup = placement == 1 || placement == 2;

  return (
    <li
      key={code}
      className={`flex items-baseline py-2 px-4 ${
        advancesFromGroup ? "bg-gray-50" : ""
      } `}
    >
      <span className="pr-2">
        <ReactCountryFlag countryCode={code} svg />
      </span>
      <span className="text-sm font-semibold">{name}</span>

      {placement ? (
        <span
          className={`text-xs ml-auto p-2  rounded-sm h-3.5 w-3.5 flex items-center justify-center ${
            advancesFromGroup
              ? "bg-blue-700 text-blue-50"
              : "text-gray-700 font-semibold"
          }`}
        >
          {placement}.
        </span>
      ) : null}
    </li>
  );
}

GroupItem.propTypes = {
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  placement: PropTypes.number,
};

export default GroupItem;
