import React from "react";

const Error: React.FunctionComponent<{ statusCode?: string | number }> = ({
  statusCode
}) => {
  return (
    <p style={{ textAlign: "center", margin: "150px auto 50px" }}>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
};

export default Error;
