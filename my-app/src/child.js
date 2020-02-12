import React from "react";

class Child extends React.Component { 
  constructor(props)  {
    super(props);
    this.state = {initial:"something"};
    console.log("Child constructor");
  }

  static getDerivedStateFromProps(props,state){
      console.log("Child getDerivedStateFromProps", {props,state});
      return state;
  }

  componentDidMount(){
    console.log("Child componentDidMount");
  }

  shouldComponentUpdate(nextProp, nextState){
    let {bool = false, a = false} = nextProp;
    console.log("Child shouldComponentUpdate");   
    return bool;
  }

  getSnapshotBeforeUpdate(prevProps,prevState){
    console.log("Child getSnapshotBeforeUpdate",{prevProps,prevState});   
    return {snapShot: "here is child snapshot"}
  }

  componentDidUpdate(prevProps, prevState, snapShot){
    console.log("Child componentDidUpdate",{prevProps,prevState,snapShot});   
  }

  componentWillUnmount(){
    console.log("Child componentWillUnmount");   
  }

  render() {
      console.log("render Child");
    return (
      <div>    
          Child
          <button onClick={()=>{
              this.forceUpdate()
          }} >Force Update Child</button>
      </div>
    );
  }
}

export default Child;
