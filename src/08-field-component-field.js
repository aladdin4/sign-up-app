import PropTypes from "prop-types";
import React from "react";

module.exports = class extends React.Component {
  //static vars belong to the class not the instances; an objof prototypes used for error handling
  static propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    validate: PropTypes.func,
    onChange: PropTypes.func.isRequired,
  };

  state = {
    value: this.props.value,
    error: false,
  };

  //this will be a child component, so we want a part of it state to be derived from it's parent <form/> element.
  getDerivedStateFromProps(nextProps) {
    return {value: nextProps.value};
  }

  onChange = (evt) => {
    //will take it's name from it's parent
    const name = this.props.name;

    //will update it's value based on the enetered data by the user
    const value = evt.target.value;

    //error handling through parent's validate method
    const error = this.props.validate ? this.props.validate(value) : false;

    this.setState({value, error});

    //calling the parent's event handler with the updated values entered and their validation results
    this.props.onChange({name, value, error});
  };

  //as an independent component, it will now render itself
  render() {
    return (
      <div>
        <input
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.onChange}
        />

        {/*will be empty span if there wereno errors*/}
        <span style={{color: "red"}}>{this.state.error}</span>
      </div>
    );
  }
};
