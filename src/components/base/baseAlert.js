import React, { useState } from "react";
import PropTypes from "prop-types";

function BaseAlert({ title, children }) {
  const [isVisible, setVisibility] = useState(true);

  function onHide() {
    setVisibility(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="relative bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
      <div className="flex">
        <div className="ml-3">
          <h3 className="text-lg font-semibold text-blue-800">{title}</h3>

          <div className="text-sm font-medium text-blue-700">{children}</div>
        </div>
        {/* x-icon */}
        <button
          onClick={onHide}
          className="absolute top-2 right-2"
          title="Hide"
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

BaseAlert.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
};

export default BaseAlert;
