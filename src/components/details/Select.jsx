import * as React from 'react';
import Select from "react-select";
import { connect } from "react-redux";
import {useHistory} from "react-router";
import { fetchImages} from "../redux/imagesReducer";
import PropTypes from 'prop-types';

const UnconnectedSelect =(props)=>{
    const {hints, pattern, fetchImages}=props;
    console.log(props);
    const history =useHistory;

return(hints &&hints.length?

<Select
          value={pattern}
          isClearable={true}
          onChange={selectValue => {
            fetchImages(selectValue.value);
            history.push('./images');
          }}
          options={hints}
        />:null
)
}

const mapDispatchToProps = dispatch => ({
   
    fetchImages: str => dispatch(fetchImages(str)),
  });

const NewSelect = connect(null, mapDispatchToProps)(UnconnectedSelect);
 
export default NewSelect

UnconnectedSelect.propTypes = {
  hints: PropTypes.array, 
  pattern: PropTypes.string, 
  fetchImages: PropTypes.func,

}