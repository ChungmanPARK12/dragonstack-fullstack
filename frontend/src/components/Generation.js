import React, { Component } from "react";

class Generation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generation: {
        generationId: 999,
        expiration: "2020-05-01"
      }
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/generation/next")
      .then(response => response.json())
      .then(json => {
        this.setState({ generation: json.generation });
      })
      .catch(error => console.error("error:", error));
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
