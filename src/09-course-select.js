import PropTypes from "prop-types";
/* eslint no-underscore-dangle: [2, { "allow": ["_loading"] }] */
import React from "react";

//they are just an array of strings
import Core from "./api/core.json";
import Electives from "./api/electives.json";

//reference to the imported data
const Courses = {
  core: Core,
  electives: Electives,
};

module.exports = class extends React.Component {
  static propTypes = {
    department: PropTypes.string,
    course: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  state = {
    department: null,
    course: null,
    courses: [],
    _loading: false,
  };

  //getting the data from the updated props
  getDerivedStateFromProps(update) {
    return {
      //the same properties names exist in both; the state object and the props
      department: update.department,
      course: update.course,
    };
  }

  //event handler callback function
  onSelectDepartment = (evt) => {
    //local vars
    const department = evt.target.value;

    //in case of department, we don't yet have a course, so we set it to null
    const course = null;

    //setting state with the local vars
    this.setState({department, course});

    //calling the paren't function with the new values
    this.props.onChange({name: "department", value: department});
    this.props.onChange({name: "course", value: course});

    //if the user selected a department, we add it to our state and retrieve the next level of data
    if (department) {
      this.fetch(department);
    }
  };

  //event handler callback function
  onSelectCourse = (evt) => {
    const course = evt.target.value;

    //setting state with the local vars
    this.setState({course});

    //calling the paren't function with the new values
    this.props.onChange({name: "course", value: course});
  };

  fetch = (department) => {
    //reset the courses, and change the loading state
    this.setState({_loading: true, courses: []});

    //takes the returned resolved promise and save it's value as our array
    apiClient(department).then((courses) => {
      this.setState({_loading: false, courses: courses});
    }); //end of then(cb)
    //the method sent here is the cb in  apiClient.then definition;
    //the received from cb.then is used here in setState()
  };

  //the first half of the render() {a minifield}
  renderDepartmentSelect = () => {
    return (
      <select
        //calling it's own event handler, which is inherited eventually from the props
        onChange={this.onSelectDepartment}
        //we will update the value here every time we setState() => render => change value
        value={this.state.department || ""}
      >
        <option value="">Which department?</option>
        <option value="core">NodeSchool: Core</option>
        <option value="electives">NodeSchool: Electives</option>
      </select>
    );
  };

  //the second half of the render() {a minifield}
  renderCourseSelect = () => {
    //first condition of this minifield
    if (this.state._loading) {
      return <img alt="loading" src="/img/loading.gif" />;
    }

    //second condition of this minifield
    if (!this.state.department || !this.state.courses.length) return <span />;

    //the main condition
    return (
      //calling it's own event handler, which is inherited eventually from the props
      <select onChange={this.onSelectCourse} value={this.state.course || ""}>
        {[
          <option value="" key="course-none">
            Which course?
          </option>,

          //using the spread operator because we don't know how many options there will be in the next level of data displayed
          ...this.state.courses.map((course, i) => (
            //generate an <option/> element for every course in Courses[]
            <option value={course} key={i}>
              {course}
            </option>
          )),
        ]}
      </select>
    );
  };

  render() {
    return (
      <div>
        {this.renderDepartmentSelect()}
        <br />
        {this.renderCourseSelect()}
      </div>
    );
  }
};

function apiClient(department) {
  return {
    //this is accessed via promise.then(cb); note that cb() isn't a method yet defined, although is called and used, the then is the key, u call a function that's not yet there, because it's Async. world
    then: function (cb) {
      setTimeout(() => {
        cb(Courses[department]); //the cb function is called with the returned value of the array Courses[]
      }, 1000); //end timeout
    }, //end then
  }; //end return
}
