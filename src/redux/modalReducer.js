import { createAction, createReducer } from "@reduxjs/toolkit";
import Unsplash, { toJson } from "unsplash-js";
import { splitUrls } from "../js/common";
import {accessKey} from '../js/fixtures';
import {showError} from'./imagesReducer';

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
        const data = action.payload;
        const details ={};
        details.location = data.location?.city? data.location.city+', '+((data.location.country)? data.location.country:''):'';
        details.author = data.user.name || data.user.last_name ||data.user.first_name ||'';
        details.twitter =data.user.twitter_username ||'';
        details.profile_image = data.user.profile_image.small ||'';
        details.urls = data.urls? splitUrls(data.urls):'';

        state.details = details;

        if (state.details){state.isVisible = true}
      }
        
      }) 
    .addDefaultCase(() => {});
});

export default modalReducer;


export function fetchDetails(id) {
  return dispatch => {
    
    const unsplash = new Unsplash(accessKey);
    
    unsplash.photos.getPhoto(id)
      .then(toJson)
      .then(json => {
        dispatch(getDetails(json));
        
      }).catch(err => {dispatch(showError(err.message))});
  };
}









// /////////////////////////////////////////////////////////////////////////////////////////

// const getTags = ary => [
//   ...new Set(
//     ary
//       .map(item => item.tags)
//       .flat()
//       .map(item => item.title)
//   ),
// ];

// function capitalizeFirstLetter(string) {
//     return string[0].toUpperCase() + string.slice(1);
// }
// const getOptions = ary =>ary.map((item)=>{return{value:item, label:capitalizeFirstLetter(item)}});




// export function fetchHints(pattern) {
//   return dispatch => {
//     const APP_ACCESS_KEY = "DQqGbYve6sTIg4j9f9EPdU12FLtjyb4hiplBbNECOZA";
//     const unsplash = new Unsplash({ accessKey: APP_ACCESS_KEY });
//     unsplash.search
//       .photos(pattern, 1, 30)
//       .then(toJson)
//       .then(json => {
//         dispatch(getHints(getOptions(getTags(json.results))));
//       }).catch(err => {dispatch(showError(err.message))});
//   };
// }


// // const extractData=(ary)=>{
// //     let res =ary.map((item)=>{let result={};result.id=item.id;result.urls=item.urls;result.tags=item.tags;return result;})
// //     return res;
// //   }




// export function fetchImages(pattern) {
//     return (dispatch, getState) => {
      
//       dispatch (chooseSubject(pattern));
//       //const APP_ACCESS_KEY = "DQqGbYve6sTIg4j9f9EPdU12FLtjyb4hiplBbNECOZA";

//       const unsplash = new Unsplash({ accessKey: APP_ACCESS_KEY });
//       const lastFetchedPage =getState().images.lastFetchedPage;
//       unsplash.search.photos(pattern, lastFetchedPage + 1, 30)
//       .then(toJson)
//       .then(json => {
       
//         //const count = json.total_pages;
  
//         dispatch(getImages(json.results));
    
//         //const store =[];
//         //var index =1;
 
// //     function recursiveFetch(){
// //     unsplash.search.photos(pattern, index, 30).then(toJson).then(json=>{
// //         store.push(json?.results);
// //         //json?.results && dispatch(getImages(extractData(json.results)));
// //         console.log('it is fetched:',extractData(json.results));
// //         index++;
// //         console.log('index', index);

// //     }).then((json)=>{if(index<=count){recursiveFetch()} else{console.log('store',store);dispatch(getImages(extractData(store)));}}).catch(err => {dispatch(showError(err.message))}) 
// // }


// //recursiveFetch();

// }).catch(err => {dispatch(showError(err.message))})
//     }
// }
  