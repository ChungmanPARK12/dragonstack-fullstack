import React, { Component } from "react";

const DEFAULT_GENERATION = { generationId: "", expiration: "" };
const MINIMUM_DELAY = 3000;

class Generation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generation: DEFAULT_GENERATION,
    };
    this.timer = null; // Initialize timer
  }

  componentDidMount() {
    this.fetchNextGeneration();
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  // Fetch current generation from backend
  fetchGeneration() {
    fetch("http://localhost:3000/generation")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ generation: json.generation });
      })
      .catch((error) => console.error("error:", error));
  }

  // Schedule next fetch based on expiration
  fetchNextGeneration() {
    this.fetchGeneration();

    const { generation } = this.state;
    let delay =
      new Date(generation.expiration).getTime() - new Date().getTime();

    // Fallback if expiration is not ready or delay is invalid
    if (!generation.expiration || isNaN(delay) || delay < MINIMUM_DELAY) {
      delay = MINIMUM_DELAY;
    }

    this.timer = setTimeout(() => this.fetchNextGeneration(), delay);
  }

  render() {
    const { generation } = this.state;

    return (
      <div>
        <h3>Generation {generation.generationId}. Expires on :</h3>
        <h4>{new Date(generation.expiration).toString()}</h4>
      </div>
    );
  }
}

export default Generation;
