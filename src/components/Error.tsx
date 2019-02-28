import React from "react";

const Error: React.FunctionComponent<{ statusCode?: string | number }> = ({
  statusCode
}) => {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
};

export default Error;
