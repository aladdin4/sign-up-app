import React from "react";
import isEmail from "validator/lib/isEmail";

const Field = require("./08-field-component-field.js");

const content = document.createElement("div");
document.body.appendChild(content);

module.exports = class extends React.Component {
  static displayName = "08-field-component-form";

  state = {
    fields: {
      name: "",
      email: "",
    },
    fieldErrors: {},
    people: [],
  };

  onFormSubmit = (evt) => {
    const people = this.state.people;
    const person = this.state.fields;

    evt.preventDefault();

    if (this.validate()) return;

    this.setState({
      people: people.concat(person),
      fields: {
        name: "",
        email: "",
      },
    });
  };

  //this method will be called from it's child <field/>
  onInputChange = ({name, value, error}) => {
    //a local copies of the objects
    const fields = Object.assign({}, this.state.fields);
    const fieldErrors = Object.assign({}, this.state.fieldErrors);

    //editing the local copy
    //note that: using [square brackets] instead of .dot notation happens when the property name is string or evaluates into a string.
    fields[name] = value;
    fieldErrors[name] = error;

    //setting the state with the new copies
    this.setState({fields, fieldErrors});
  };

  validate = () => {
    const person = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

    if (!person.name) return true;
    if (!person.email) return true;
    if (errMessages.length) return true;

    return false;
  };

  render() {
    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>
          <Field
            placeholder="Name"
            name="name"
            value={this.state.fields.name}
            onChange={this.onInputChange}
            validate={(val) => (val ? false : "Name Required")}
          />

          <br />

          <Field
            placeholder="Email"
            name="email"
            value={this.state.fields.email}
            onChange={this.onInputChange}
            validate={(val) => (isEmail(val) ? false : "Invalid Email")}
          />

          <br />

          <input type="submit" disabled={this.validate()} />
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
