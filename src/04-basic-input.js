import React from "react";

const content = document.createElement("div");
document.body.appendChild(content);

module.exports = class extends React.Component {
  //static properties belong to the class not to the instances
  static displayName = "04-basic-input";

  //initial state
  state = {names: []};

  onFormSubmit = (evt) => {
    const name = this.refs.name.value;

    //using spread operator to create a new, updated array; note that, this logic works only in case of adding a new element, and it's always added at the end
    const names = [...this.state.names, name];

    //update the state object
    this.setState({names: names});

    //reset the input box
    this.refs.name.value = "";
    evt.preventDefault();
  };

  render() {
    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>
          <input placeholder="Name" ref="name" />

          <input type="submit" />
        </form>

        <div>
          <h3>Names</h3>

          {/*the list that will display the names entered, which are saved in the state */}
          <ul>
            {/* mapping and displaying the array that's inside the state into a list*/}
            {this.state.names.map((name, i) => (
              <li key={i}>{name}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};
