import React from "react";

const content = document.createElement("div");
document.body.appendChild(content);

module.exports = class extends React.Component {
  static displayName = "06-state-input-multi";

  //instead of having a state property for each input fiels, we will use one state peoperty of type object, and save all inputs inside it as it's properties.
  state = {
    fields: {
      name: "",
      email: "",
    },
    //this will be an array of the state property fields, so it will be an array of objects!
    people: [],
  };

  onFormSubmit = (evt) => {
    //add the new fields
    const people = [...this.state.people, this.state.fields];

    //reset the fields, so the user can reuse it
    this.setState({
      people,
      fields: {
        name: "",
        email: "",
      },
    });
    evt.preventDefault();
  };

  //set the fields property of the state
  onInputChange = (evt) => {
    //to be able to change the fields without changing the state, we make a copy of it then change the copy
    const fields = Object.assign({}, this.state.fields);

    //works for each changing input, called every time the user edits a single input field, changing that exact input property in the fields object with the equal value
    fields[evt.target.name] = evt.target.value;

    //assign the edited copy of fields to the state
    this.setState({fields});
  };

  render() {
    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>
          <input
            placeholder="Name"
            name="name"
            value={this.state.fields.name}
            onChange={this.onInputChange}
          />

          <input
            placeholder="Email"
            name="email"
            value={this.state.fields.email}
            onChange={this.onInputChange}
          />

          <input type="submit" />
        </form>

        <div>
          <h3>People</h3>
          <ul>
            {this.state.people.map(({name, email}, i) => (
              //we set the keys by index  because it's a simple list, no sorting or rearranging or element removal or any thing
              <li key={i}>
                {name} ({email})
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};
