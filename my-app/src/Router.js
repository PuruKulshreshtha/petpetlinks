import React from "react";
import { Switch, Route } from "react-router-dom";
import Register from "./register";
import Login from "./login";
import Error from "./ErrorPage";
import Timeline from "./timeline";
import Forget from "./forget";
import SinglePost from "./single_post";
import VerifyPage from "./verificationPage";
import ChangePassword from "./changePassword";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Timeline} />
      <Route path="/signup" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/timeline" component={Timeline} />
      <Route path="/forget" component={Forget} />
      <Route path={"/singlePost/:id"} component={SinglePost} />
      <Route path={"/singlePost"} component={SinglePost} />
      <Route path="/index" component={Timeline} />
      <Route path={"/changePassword/:id"} component={ChangePassword} />
      <Route path={"/verify/:id"} component={VerifyPage} />
      <Route path="/err" component={Error} />
      <Route path="*" component={Login} />
    </Switch>
  </main>
);

export default Main;
