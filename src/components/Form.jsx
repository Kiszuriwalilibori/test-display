import React, { useState, useEffect, useCallback } from "react";
import { useHistory, withRouter } from "react-router";
import debounce from "lodash/debounce";
import Select from "react-select";
import { connect } from "react-redux";
import { fetchImages, fetchHints, clearHints } from "../redux/imagesReducer";
import SearchButton from "./details/SearchButton";
import ClearButton from "./details/ClearButton";
import Input from "./details/Input";
import { createFormStyleLocationRelative } from "../js/common";
import NoHintsMessage from "./details/NoHintsMessage";
import ImagesHint from "./details/ImagesHint";
import PropTypes from "prop-types";

const UnconnectedForm = props => {
  const { fetchHints, hints, clearHints, fetchImages } = props;
  const history = useHistory();
  const [pattern, setPattern] = useState("");

  useEffect(() => {
    fetchHints(pattern);
  }, [pattern, fetchHints]);

  const updatePattern = e => {
    e.preventDefault();
    setPattern(e.target.value);
  };

  const path = props.match.path;
  const handleSubmit = e => {
    e.preventDefault();
    return false;
  };
  

  function keydowner (e) {
    if (e.key === "Enter") {
      var elements = document.querySelectorAll(":hover");
      var arr = Array.from(elements);
      const item = arr[arr.length - 1];
      const classname = item.className;
      if (classname.includes("option")) {
       
        fetchImages(item.textContent);
        history.push("./images");
      }
    }
  }


  const keydownHandler = useCallback(
    debounce((e) => {
      keydowner(e);
    }, 300),
    []
  );


  return (
    <div onKeyDown ={keydownHandler}>
      <form className={createFormStyleLocationRelative(path, "form")} onSubmit={handleSubmit}>
        <SearchButton />
        <Input pattern={pattern} callback={updatePattern} />
        <ClearButton
          isVisible={pattern}
          click={e => {
            setPattern("");
            clearHints();
          }}
        />
      </form>

      {hints && hints.length && path === "/" ? (
        <Select
          className="select-top"
          id="BigSelect"
          value={pattern}
          isClearable={true}
          menuIsOpen={true}
          onChange={selectValue => {
            fetchImages(selectValue.value);
            history.push("./images");
          }}
          options={hints}
        />
      ) : null}

      {hints && hints.length && path === "/images" ? (
        <div className="images-hints-wrapper" id="images-hints-wrapper">
          {hints.map((hint, index) => (
            <ImagesHint key={index} hint={hint} />
          ))}
        </div>
      ) : null}
      <NoHintsMessage path={path} />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchHints: str => dispatch(fetchHints(str)),
  clearHints: str => dispatch(clearHints(str)),
  fetchImages: str => dispatch(fetchImages(str)),
});

const mapStateToProps = state => ({
  hints: state.images.hints,
});

const Form = withRouter(connect(mapStateToProps, mapDispatchToProps)(UnconnectedForm));

export default Form;

UnconnectedForm.propTypes = {
  fetchHints: PropTypes.func,
  fetchImages: PropTypes.func,
  clearHints: PropTypes.func,
  hints: PropTypes.array,
};
