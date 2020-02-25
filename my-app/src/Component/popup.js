import React from "react";
import "./popupStyle/style.css";

class Popup extends React.PureComponent {
  render() {
    return (
      <div className="popup">
        <div className="popup\_inner">
          <h4 style={{ textAlign: "center" }}>Upload Post</h4>
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
          <form
            onSubmit={this.props.fileUpload}
            method="POST"
            encType="multipart/form-data"
            id="rcorners1"
          >
            <ul>
              <li>
                <label htmlFor="mail">Title</label>
                <input type="text" name="title" required />
              </li>

              <li>
                <label htmlFor="name">category</label>

                <select name="category">
                  {this.props.categories.map((data, index) => {
                    //console.log("dzdfhg",data._id);
                    return (
                      <option key={data._id} value={data._id}>
                        {data.category}
                      </option>
                    );
                  })}
                </select>
              </li>
              <li>
                <input
                  type="file"
                  name="selectedFiles"
                  required
                  accept="image/x-png,image/gif,image/jpeg"
                />
              </li>
              <li>
                Featured{" "}
                <input
                  type="checkbox"
                  onChange={e => this.props.handleChange(e)}
                  name="featured"
                />
              </li>
              <br />
              <li>
                <input type="Submit" name="upload" />
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}

export default Popup;
