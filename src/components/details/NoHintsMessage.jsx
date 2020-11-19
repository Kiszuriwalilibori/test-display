import * as React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

const HintsMessage = props => {
  const { isVisible, path } = props;
  const classy = (path === '/images')? "noHints--short search-text--dark" : 'noHints search-text--dark'
  return isVisible ? <h2 className = {classy} >Nie znaleziono podpowiedzi dla wprowadzonego tekstu</h2> : null;
};

const mapStateToProps = state => ({
  isVisible: state.images.hintsMessageVisible,
});

const NoHintsMessage = connect(mapStateToProps)(HintsMessage);
export default NoHintsMessage;

//HintsMessage.propTypes = PropTypes.string;