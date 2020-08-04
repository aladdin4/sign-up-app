import React from "react";

const content = document.createElement("div");
document.body.appendChild(content);

module.exports = class extends React.Component {
  static displayName = "05-state-input";

  //to create a controlled component we have to save it inside state
  state = {
    name: "",
    names: [],
  };

  //now this function has to update 2 props in the state object
  onFormSubmit = (evt) => {
    const names = [...this.state.names, this.state.name];

    //reset the {name} after adding it to the other state prop {names}
    this.setState({names: names, name: ""});
    evt.preventDefault();
  };

  onNameChange = (evt) => {
    //updating the state with the data the user entered
    this.setState({name: evt.target.value});
  };

  render() {
    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>
          <input
            placeholder="Name"
            //get the value from the state now
            value={this.state.name}
            //calling the function that will update the state
            onChange={this.onNameChange}
          />

          <input type="submit" />
        </form>

        <div>
          <h3>Names</h3>
          <ul>
            {this.state.names.map((name, i) => (
              <li key={i}>{name}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};
