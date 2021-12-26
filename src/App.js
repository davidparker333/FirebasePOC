import "./App.css";

import React, { Component } from "react";
import Names from "./Names";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import firebaseConfig from "./FirebaseConfig";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      dbNames: [],
      firebase: "",
      database: "",
    };
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let names = this.state.dbNames;
    names.push(this.state.name);
    set(ref(this.state.database, "names"), {
      name: names,
    });
  };

  componentDidMount = () => {
    this.setState({ firebase: initializeApp(firebaseConfig) });
    this.setState({ database: getDatabase(this.firebase) });
    const namesRef = ref(getDatabase(), "names");
    onValue(namesRef, (snapshot) => {
      const data = snapshot.val();
      this.setState({ dbNames: data.name || [] });
    });
  };

  render() {
    return (
      <div>
        <h1 className="banner">This is a Firebase POC</h1>

        <form className="form" onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input value={this.state.name} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <div className="db">
          <ul>
            {this.state.dbNames.map((name, index) => (
              <Names name={name} key={index} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
