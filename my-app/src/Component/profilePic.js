import React, { Component } from "react";
// import Webcam from "react-webcam";
class ProfilePic extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <div className="popup1">
          <h4 style={{ textAlign: "center" }}>{this.props.name}</h4>
          <div className="topright">
            <div onClick={this.props.closePopup}>
              <img
                height="20px"
                width="30px"
                alt="close"
                src="/images/close.ico"
              ></img>
            </div>
          </div>
          <div
            style={{
              border: "2px dashed white",
              borderRadius: "15px",
              width: "80%",
              margin: "40px",
              height: "70%",
              padding: "20px"
            }}
          >
            <img
              alt="profilepic"
              src={this.props.image}
              style={{
                objectFit: "contain",
                height: "100%",
                width: "100%",
                float: "left"
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePic;

// const videoConstraints = {
//   width: 1280,
//   height: 720,
//   facingMode: "user"
// };

// const WebcamCapture = () => {
//   const webcamRef = React.useRef(null);

//   const capture = React.useCallback(() => {
//     const imageSrc = webcamRef.current.getScreenshot();
//   }, [webcamRef]);

//   return (
//     <div style={{ height: "100px", width: "100px" }}>
//       <Webcam
//         audio={false}
//         height={1200}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         width={1500}
//         videoConstraints={videoConstraints}
//       />
//       <button onClick={capture}>Capture photo</button>
//     </div>
//   );
// };

// export default WebcamCapture;
