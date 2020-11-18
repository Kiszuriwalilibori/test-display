import { createAction, createReducer } from "@reduxjs/toolkit";
import Unsplash, { toJson } from "unsplash-js";
import { splitUrls } from "../js/common";
import {accessKey} from '../js/fixtures';
import {showError, checkNeighbours} from'./imagesReducer';

export const showModal = createAction("MODAL_SHOW");
export const hideModal = createAction("MODAL_HIDE");
export const getDetails = createAction("DETAILS_GET");

const initialState = {
  isVisible: false,
  details: {},
  error: ''
};

const modalReducer = createReducer(initialState, builder => {
  builder
    
    .addCase(showModal, (state) => {
       
        state.isVisible =true;
              
      })
      .addCase(hideModal, (state) => {
        state.isVisible =false;
        
      })  
     
      .addCase(getDetails, (state,action) => {
       if (action.payload) {
        
        const {data, neighbours} = action.payload;
        const details ={};
        details.location = data.location?.city? data.location.city+', '+((data.location.country)? data.location.country:''):'';
        details.author = data.user.name || data.user.last_name ||data.user.first_name ||'';
        details.twitter =data.user.twitter_username ||'';
        details.profile_image = data.user.profile_image.small ||'';
        details.urls = data.urls? splitUrls(data.urls):'';
        details.previous = neighbours.previous;
        details.next = neighbours.next;
        state.details = details;

        if (state.details){state.isVisible = true}
      }
        
      }) 
    .addDefaultCase(() => {});
});

export default modalReducer;


export function fetchDetails(id) {
  return (dispatch, getState) => {
    
    const unsplash = new Unsplash(accessKey);
    
    unsplash.photos.getPhoto(id)
      .then(toJson)
      .then(json => {
        const images =getState().images.images;
        
        const index = images.findIndex((item=>{return(json.id === item.id)}));
        let neighbours={}
        neighbours.previous = (index ===0)? null:images[index -1 ].id;
        neighbours.next = (index === images.length -1)? null:images[index+1].id;
        const result = {data:json, neighbours:neighbours };
        dispatch(getDetails(result));
        
      }).catch(err => {dispatch(showError(err.message))});
  };
}

