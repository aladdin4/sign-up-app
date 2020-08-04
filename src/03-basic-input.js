import React from "react";

const content = document.createElement("div");
document.body.appendChild(content);

module.exports = class extends React.Component {
  static displayName = "03-basic-input";

  onFormSubmit = (evt) => {
    evt.preventDefault();

    //using refs is a special attribute of react JSX components; an easier way to access and select elements
    console.log(this.refs.name.value);
  };

  render() {
    //here, we render JSX directly from here, we don't get a child component or anything
    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>
          {/*giving the <input/> a ref property */}
          <input placeholder="Name" ref="name" />

          <input type="submit" />
        </form>
      </div>
    );
  }
};
