import React from "react";
import PropTypes from "prop-types";

function SectionHeading({ title, supportingTitle, resetHandler, resetTitle }) {
  return (
    <div className="pb-5 border-b border-gray-200 my-6">
      <div className="flex items-baseline">
        <h3 className="ml-2 text-2xl leading-6 font-medium text-gray-900">
          {title}
        </h3>
        <p className="ml-2 pt-2.5 text-sm text-gray-500 truncate">
          {supportingTitle}
        </p>

        <div className="ml-auto flex items-center pt-2">
          <button onClick={resetHandler} title={resetTitle}>
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

SectionHeading.propTypes = {
  title: PropTypes.string.isRequired,
  supportingTitle: PropTypes.string.isRequired,
  resetHandler: PropTypes.func.isRequired,
  resetTitle: PropTypes.string.isRequired,
};

export default SectionHeading;
