import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGeneration } from "../actions/generation";
import fetchStates from "../reducers/fetchStates";

var MINIMUM_DELAY = 3000;

class Generation extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.fetchNextGeneration = this.fetchNextGeneration.bind(this);
  }

  componentDidMount() {
    this.fetchNextGeneration();
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  fetchNextGeneration() {
    this.props.fetchGeneration();

    var generation = this.props.generation;

    if (!generation || !generation.expiration) {
      var self = this;
      this.timer = setTimeout(function () {
        self.fetchNextGeneration();
      }, MINIMUM_DELAY);
      return;
    }

    var delay =
      new Date(generation.expiration).getTime() - new Date().getTime();

    if (isNaN(delay) || delay < MINIMUM_DELAY) {
      delay = MINIMUM_DELAY;
    }

    var self2 = this;
    this.timer = setTimeout(function () {
      self2.fetchNextGeneration();
    }, delay);
  }

  render() {
    var generation = this.props.generation;
    var fetchState = this.props.fetchState;
    var message = this.props.message;

    if (fetchState === fetchStates.fetching) {
      return <div>Loading generation...</div>;
    }

    if (fetchState === fetchStates.error) {
      return (
        <div>
          <h3>Could not load generation</h3>
          <p>{message}</p>
        </div>
      );
    }

    if (!generation) {
      return <div>Loading generation...</div>;
    }

    return (
      <div>
        <h3>Generation {generation.generationId}. Expires on :</h3>
        <h4>{new Date(generation.expiration).toString()}</h4>
      </div>
    );
  }
} 

function mapStateToProps(state) {
  return {
    generation: state.generation.generation,
    fetchState: state.generation.fetchState,
    message: state.generation.message
  };
}

export default connect(mapStateToProps, { fetchGeneration: fetchGeneration })(
  Generation
);
