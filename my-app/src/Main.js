import React from "react";
import Router from "./Router";
import Header from "./Component/header_fotter/Header";
import Footer from "./Component/header_fotter/Footer";
import { Provider } from "react-redux";
import store from "./Redux/store";
class Main extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Header />
          <Router />
          <Footer />
        </Provider>
      </div>
    );
  }
}

export default Main;
