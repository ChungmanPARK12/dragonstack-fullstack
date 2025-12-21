import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import DragonAvatar from "./DragonAvatar";
import { fetchDragon } from "../actions/dragon";

class Dragon extends Component {
  constructor(props) {
    super(props);

    this.handleNewDragon = this.handleNewDragon.bind(this);
  }

  componentDidMount() {
    //this.props.fetchDragon();
  }

  handleNewDragon() {
    this.props.fetchDragon();
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleNewDragon}>New Dragon</Button>
        <DragonAvatar dragon={this.props.dragon} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dragon: state.dragon.dragon
  };
}

export default connect(mapStateToProps, { fetchDragon: fetchDragon })(Dragon);
