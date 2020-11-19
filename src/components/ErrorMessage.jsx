import * as React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { clearError } from "../redux/imagesReducer";
import PropTypes from 'prop-types';

const MyAlert = withStyles({
  root: {
    background: "#688B69;",
    color: "#F5F2AA",
    fontSize: "1.25rem",
    border: "1px solid 4d684d",
    boxShadow:
      "inset 0 0 5px #4d684d, 0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07), 0 16px 32px rgba(0,0,0,0.07), 0 32px 64px rgba(0,0,0,0.07)",
  },
})(Alert);

const Message = (props) => {
  
  const { isOpen, close, message } = props;

  return (
    <Snackbar open={isOpen} autoHideDuration={5000} onClose={close}>
      <MyAlert severity="success" variant="filled">
        Wystąpił błąd:
        <br />
         {message}
        <br />
      </MyAlert>
    </Snackbar>
  );
};

const mapDispatchToProps = (dispatch) => ({
  
  close: () => dispatch(clearError()),
});

const mapStateToProps = (state) => ({
  isOpen: state.images.error.value,
  message: state.images.error.code,
});

const ErrorMessage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);

export default ErrorMessage;

Message.propTypes ={
  isOpen:PropTypes.bool,
  message:PropTypes.string,
  close:PropTypes.func
}