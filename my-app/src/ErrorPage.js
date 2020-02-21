import React from "react";

class Forget extends React.Component {
  render() {
    return (
      <div
        style={{
          textAlign: "center",
          margin: "15px",

          color: "#f09717"
        }}
      >
        <h1>500 </h1>
        <h1>
          An internal error occurred on the server. This may be because of an
          application error or configuration problem
        </h1>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "300px",
            color: "#f09717"
          }}
        >
          SERVER IS NO RUNNING{" "}
        </h1>
      </div>
    );
  }
}

export default Forget;
