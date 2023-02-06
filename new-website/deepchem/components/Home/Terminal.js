import React, { useState } from "react";
import Dropdown from "react-dropdown";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import TERMINAL_COMMANDS from "../../data/home/terminal-commands.json";

/**
 * A React component that creates an Alert component with Material UI styling.
 * @component
 * @param {Object} props - The props to pass down to the Material UI Alert component.
 * @param {Object} ref - The ref to pass down to the Material UI Alert component.
 * @returns {React.Element} - A Material UI Alert component with the passed props and ref.
 */
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/**
 * Component for the terminal displayed on the home screen
 * @component
 * @param {Object} props - props passed to the component
 * @param {Object} props.setTerminalVisible - function to hide the terminal
 * @return {JSX.Element} - JSX component for the terminal displayed on the home screen
 */
const Terminal = ({ setTerminalVisible }) => {
  // Use the first command in the datafile as the initial command
  const [terminalCommand, setTerminalCommand] = useState(
    TERMINAL_COMMANDS[Object.keys(TERMINAL_COMMANDS)[0]]
  );
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  /**
   * Handles the click event to open the component
   */
  const handleClick = () => {
    setIsAlertOpen(true);
  };

  /**
   * Handles the close event for the component
   * @function
   * @param {React.SyntheticEvent} event - The event object for the close action
   * @param {string} reason - The reason for closing the component
   */
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsAlertOpen(false);
  };

  /**
   * Handle the event when the user changes the current package manager
   * @function
   * @param {Object} option - the option selected by the user in the dropdown
   */
  const handlePackageChange = (option) => {
    setTerminalCommand(TERMINAL_COMMANDS[option.label]);
  };

  return (
    <>
      <div className="flex flex-col max-w-[800px] w-full shadow-xl rounded-2xl">
        <div className="flex flex-row justify-between bg-terminal-header px-8 py-4 rounded-t-2xl items-center">
          <div className="flex flex-row gap-2 items-center">
            <span
              className="h-4 w-4 bg-terminal-red inline-block rounded-full"
              onClick={() => {
                setTerminalVisible(false);
              }}
            />
            <span className="h-4 w-4 bg-terminal-yellow inline-block rounded-full" />
            <span className="h-4 w-4 bg-terminal-green inline-block rounded-full" />
          </div>
          {/* <p className="text-lg justify-self-center invisible lg:visible">
    deepchem -- bash
  </p> */}
          <div className="flex flex-row items-center gap-2 ">
            <Dropdown
              options={["pip", "conda", "docker"]}
              controlClassName="!rounded !border-none !bg-terminal-header justify-between text-sm flex flex-row gap-2 !px-6 hover:!bg-white/30 hover:!shadow-md"
              menuClassName="rounded-b"
              value="Select package manager"
              onChange={handlePackageChange}
              placeholder="Select an option"
              arrowOpen={
                <span>
                  <i className="fa-solid fa-angle-right w-4"></i>
                </span>
              }
              arrowClosed={
                <span>
                  <i className="fa-solid fa-angle-down w-4"></i>
                </span>
              }
            />
          </div>
        </div>
        <div className="flex flex-row px-8 bg-white py-4 lg:py-6 rounded-b-2xl lg:text-2xl font-inconsolata ">
          <p className="pr-2 font-extrabold">$</p>
          <div className="mr-auto">
            {terminalCommand.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          <CopyToClipboard
            text={terminalCommand.reduce(
              (copyText, currentLine) => copyText + "\n" + currentLine
            )}
          >
            <i
              className="p-3 fa-regular self-center fa-copy cursor-pointer text-dc-light-gray hover:text-white hover:bg-dc-orange rounded-full transition-all"
              onClick={handleClick}
            ></i>
          </CopyToClipboard>
        </div>
      </div>

      <Snackbar
        open={isAlertOpen}
        autoHideDuration={1000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{
            width: "100%",
            background: "#252422",
          }}
        >
          Copied!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Terminal;
