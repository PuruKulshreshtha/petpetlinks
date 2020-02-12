import React from "react";
import Child from "./child";

class Parent extends React.Component { 
  constructor(props)  {
    super(props);
    this.state = {initial:"something", bool: true};
    console.log("Parent constructor");
  }

  static getDerivedStateFromProps(props,state){
      console.log("Parent getDerivedStateFromProps", {props,state});
      return state;
  }

  componentDidMount(){  
    console.log("Parent componentDidMount");
  }

  componentWillUnmount(){
    console.log("Parent componentWillUnmount");   
  }

  onPress = () => {
      this.setState({bool:!this.state.bool});
  }

  shouldComponentUpdate(){
    console.log("Parent shouldComponentUpdate");   
    return true;
  }

  getSnapshotBeforeUpdate(prevProps,prevState){
    console.log("Parent getSnapshotBeforeUpdate",{prevProps,prevState});   
    return {snapShot: "here is parent snapshot"}
  }

  componentDidUpdate(prevProps, prevState, snapShot){
    console.log("Parent componentDidUpdate",{prevProps,prevState,snapShot});   
  }

  render() {
      console.log("render parent");
    return (
      <div>    
          Parent
          <button onClick={this.onPress} >Toggle Parent State bool</button>
          { this.state.bool && <Child bool={this.state.bool} />}
      </div>
    );
  }
}

export default Parent;
