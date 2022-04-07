import React from "react";
import PropTypes from "prop-types";

function Brackets({
  showEmptyState,
  emptyStateClickHandler,
  emptyStateHandlerDisabled,
  id,
}) {
  function localEmptyStateClickHandler() {
    if (emptyStateHandlerDisabled) {
      return;
    }

    emptyStateClickHandler();
  }

  if (!showEmptyState) {
    const classNames = emptyStateHandlerDisabled
      ? "cursor-default"
      : "hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

    return (
      <div>
        <button
          onClick={localEmptyStateClickHandler}
          type="button"
          className={`${classNames} relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center`}
        >
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            ></path>
          </svg>

          <span className="mt-2 block text-sm font-medium text-gray-900">
            Simulate playoffs
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto whitespace-nowrap">
      {/* The bracket section is rotated because the brackets are rendered from the tournament root (winner) */}
      {/* Add horizontal scroll-container for the brackets. Right now we just hardcode this */}
      <div
        id={id}
        className="mt-4 flex w-max justify-end transform rotate-180"
      ></div>
    </div>
  );
}

Brackets.propTypes = {
  showEmptyState: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  emptyStateClickHandler: PropTypes.func.isRequired,
  emptyStateHandlerDisabled: PropTypes.bool.isRequired,
};

export default Brackets;
