import React from "react";
import isEmail from "validator/lib/isEmail";

const content = document.createElement("div");
document.body.appendChild(content);

module.exports = class extends React.Component {
  static displayName = "07-basic-validation";

  state = {
    fields: {
      name: "",
      email: "",
    },

    // a new state property, for saving and rendering the error msgs
    fieldErrors: {},
    people: [],
  };

  //this is the best place for validation, after the user done filling the fields and before rendering, so we control the flow of the program according to the errors(whether they existed or not)
  onFormSubmit = (evt) => {
    //local copy of the people array
    const people = [...this.state.people];
    const person = this.state.fields;

    //calling the validate() with fields of the state, validating the last effect of onInputChange() before the user submits
    const fieldErrors = this.validate(person);

    //save in the state the result of validate(), same pattern, we save the local copy after editing it in the state
    this.setState({fieldErrors});
    evt.preventDefault();

    //if errors existed, exit prematurely and don't save the enterd data in the state
    if (Object.keys(fieldErrors).length) return;

    this.setState({
      //add the new person object to the people array
      people: people.concat(person),

      //empty the fields so the user can enter a new data
      fields: {
        name: "",
        email: "",
      },
    });
  };

  onInputChange = (evt) => {
    //make a local copy of the state object
    const fields = Object.assign({}, this.state.fields);

    //edit the local copy with new entered data
    fields[evt.target.name] = evt.target.value;

    //set the state with the newly edited local copy
    this.setState({fields});
  };

  //a method for validating the data entered by the user, it accepts a fields object argument and returns an errors object containing the errors that exists as properties of it.
  validate = (person) => {
    const errors = {};

    //we add properties for the errors objects according to the error type
    if (!person.name) errors.name = "Name Required";
    if (!person.email) errors.email = "Email Required";
    if (person.email && !isEmail(person.email)) errors.email = "Invalid Email";
    return errors;
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

          {/*will be an empty span if there were no errors */}
          <span style={{color: "red"}}>{this.state.fieldErrors.name}</span>

          <br />

          <input
            placeholder="Email"
            name="email"
            value={this.state.fields.email}
            onChange={this.onInputChange}
          />

          {/*will be an empty span if there were no errors */}
          <span style={{color: "red"}}>{this.state.fieldErrors.email}</span>

          <br />

          <input type="submit" />
        </form>

        <div>
          <h3>People</h3>
          <ul>
            {this.state.people.map(({name, email}, i) => (
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
