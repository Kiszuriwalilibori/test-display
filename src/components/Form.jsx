import React, { useState, useEffect} from "react";
import {useHistory, withRouter} from "react-router";
import Select from "react-select";
import { connect } from "react-redux";
import { fetchImages, fetchHints, clearHints} from "../redux/imagesReducer";
import SearchButton from './details/SearchButton';
import ClearButton from './details/ClearButton';
import Input from './details/Input';
import {createFormStyleLocationRelative} from '../js/common';
import NoHintsMessage from './details/NoHintsMessage';
import ImagesHint from "./details/ImagesHint";


const UnconnectedForm = props => {
  const { fetchHints, hints, clearHints, fetchImages } = props;
  const history = useHistory();
  const [pattern, setPattern] = useState("");

  useEffect(() => {
   
      fetchHints(pattern);
    
  }, [pattern, fetchHints]);


const updatePattern =e=>setPattern(e.target.value);

const path = props.match.path;

  return (
    <>
      <form className={createFormStyleLocationRelative(path,'form')}> 
        <SearchButton />
        <Input pattern={pattern} callback ={updatePattern} /> 
        <ClearButton
          isVisible={pattern}
          click={e => {
            setPattern("");
            clearHints();
          }}
        />
      </form>

      {hints && hints.length && (path==='/')? (
        <Select className='select-top'
          value={pattern}
          isClearable={true}
          menuIsOpen ={true}
          onChange={selectValue => {
            fetchImages(selectValue.value);
            history.push('./images');
          }}
          options={hints}
        />
      ) : null}

{hints && hints.length && (path==='/images')?(

<div className="images-hints-wrapper" id="images-hints-wrapper">
        {hints.map((hint, index) => (
          <ImagesHint key={index} hint={hint} />
        ))}
      </div>):null}










      <NoHintsMessage path ={path}/>
    </>
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


























