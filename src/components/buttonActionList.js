import React from "react";
import PropTypes from "prop-types";

import BaseButton from "../../src/components/base/baseButton";

function ButtonActionList({ buttons }) {
  return (
    <div className="flex w-full justify-end space-x-4">
      {buttons
        .filter((button) => button.isVisible)
        .map(({ title, isDisabled, handler }) => {
          return (
            <BaseButton
              key={title}
              title={title}
              isDisabled={isDisabled}
              clickHandler={handler}
            ></BaseButton>
          );
        })}
    </div>
  );
}

ButtonActionList.propTypes = {
  buttons: PropTypes.array.isRequired,
};

export default ButtonActionList;
