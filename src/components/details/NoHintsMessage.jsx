import * as React from "react";

import { connect } from "react-redux";

const HintsMessage = props => {
  const { isVisible, path } = props;
  const classy = (path === '/images')? "noHints--short search-text--dark" : 'noHints search-text--dark'

  //return isVisible ? <h2 className="noHints search-text--dark">Nie znaleziono podpowiedzi dla wprowadzonej sekwencji znaków</h2> : null;
  return isVisible ? <h2 className = {classy} >Nie znaleziono podpowiedzi dla wprowadzonej sekwencji znaków</h2> : null;
};

const mapStateToProps = state => ({
  isVisible: state.images.hintsMessageVisible,
});

const NoHintsMessage = connect(mapStateToProps)(HintsMessage);
export default NoHintsMessage;
