import React, { Component } from "react";

export default class Names extends Component {
  render() {
    const name = this.props.name;
    return (
      <div>
        <li>{name}</li>
      </div>
    );
  }
}
