import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const MySubject = props => (
  <div className="images__header">
    <h2 className="images__subject">{props.subject}</h2>{" "}
  </div>
);

const mapStateToProps = state => ({
  subject: state.images.subject,
});

const Subject = connect(mapStateToProps, null)(MySubject);

export default Subject;

MySubject.propTypes = { subject: PropTypes.string};
