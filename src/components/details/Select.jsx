import * as React from 'react';
import Select from "react-select";
import { connect } from "react-redux";
import {useHistory} from "react-router";
import { fetchImages} from "../redux/imagesReducer";

const UnconnectedSelect =(props)=>{
    const {hints, pattern, fetchImages}=props;
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