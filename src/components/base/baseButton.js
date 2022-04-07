import React from "react";
import PropTypes from "prop-types";

function BaseButton({ title, isDisabled, clickHandler }) {
  if (isDisabled) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        className="inline-flex items-center px-3 py-1.5 border border-transparent cursor-default text-base font-medium rounded-md shadow-sm text-gray-500 bg-gray-100"
      >
        {title}
      </button>
    );
  }

  return (
    <button
      onClick={clickHandler}
      type="button"
      className="inline-flex items-center px-3 py-1.5 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {title}
    </button>
  );
}

BaseButton.propTypes = {
  title: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default BaseButton;
