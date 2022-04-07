import PropTypes from "prop-types";
import React from "react";

import ReactCountryFlag from "react-country-flag";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden font-sans text-gray-900">
      <main className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-10">
        {children}
      </main>

      <footer className="bg-blue-700">
        <nav className="flex justify-between max-w-4xl p-4 mx-auto text-sm md:p-8">
          <p className="text-white flex flex-col justify-center">
            <span className="font-bold no-underline">
              Created by{` `} Jonathan.
            </span>
            <span>
              {`Let's`} go <ReactCountryFlag countryCode={"DK"} svg />
            </span>
          </p>

          <p>
            <a
              className="font-bold text-white no-underline"
              href="https://github.com/jonakirke94/worldcup2022-simulator"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </nav>
      </footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
