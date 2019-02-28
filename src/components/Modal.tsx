import React from "react";

import Portal from "./Portal";

let Modal: React.FunctionComponent<{ isOpen: boolean; close: () => void }> = ({
  isOpen,
  close
}) => {
  if (isOpen) {
    return (
      <Portal selector="#modal">
        <div className="overlay">
          <div className="modal">
            <p>An error occured</p>
            <button type="button" onClick={() => close()}>
              Close Modal
            </button>
            {/* 
            // @ts-ignore */}
            <style jsx global>{`
              body {
                overflow: hidden;
              }
            `}</style>
            {/* 
            // @ts-ignore */}
            <style jsx>{`
              .overlay {
                position: fixed;
                background-color: rgba(0, 0, 0, 0.7);
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
              }
              .modal {
                background-color: white;
                position: absolute;
                top: 10%;
                right: 10%;
                bottom: 10%;
                left: 10%;
                padding: 1em;
                border: 1px solid black;
              }
            `}</style>
          </div>
        </div>
      </Portal>
    );
  }
  return null;
};

export default Modal;
