import { createAction, createReducer } from "@reduxjs/toolkit";
import Unsplash, { toJson } from "unsplash-js";
import { extractData, getOptions, getTags } from "../js/common";
import { accessKey } from "../js/fixtures";

export const getImages = createAction("IMAGES_GET");
export const getHints = createAction("HINTS_GET");
export const clearHints = createAction("HINTS_CLEAR");
export const showError = createAction("ERROR_SHOW");
export const clearError = createAction("ERROR_CLEAR");
export const setCount = createAction("COUNT_SET");
export const chooseSubject = createAction("SUBJECT_CHOOSE");
export const clearImages = createAction("IMAGES_CLEAR");
export const setCollectionLength = createAction("COLLECTION_LENGTH_SET");
export const showHintsMsg = createAction("HINTS_MESSAGE_SHOW");
export const hideHintsMsg = createAction("HINTS_MESSAGE_HIDE");
export const getBackgroundImage = createAction("GET_BACKGROUND_IMAGE");


const initialState = {
  images:[],
  hints: [],
  error: { value: false, code: "" },
  count: 0,
  lastFetchedPage: 0,
  subject: "",
  collectionLength: 0,
  hintsMessageVisible: false,
  backgroundImage:{}
};

const imagesReducer = createReducer(initialState, builder => {
  builder

    .addCase(getImages, (state, action) => {
      if (action.payload) {
        let temp =[...state.images];
        temp.push.apply(temp, extractData(action.payload));
        state.images = temp;
        state.lastFetchedPage++;
      }
    })

    .addCase(setCollectionLength, (state, action) => {
      if (action.payload) {
        state.collectionLength = action.payload;
      }
    })

    .addCase(getHints, (state, action) => {
      if (action.payload) {
        state.hints = action.payload;
      }

      if (action.payload.length){state.hintsMessageVisible = initialState.hintsMessageVisible}
      else{state.hintsMessageVisible = true }
    })
    .addCase(setCount, (state, action) => {
      if (action.payload) {
        state.count = action.payload;
      }
    })

    .addCase(clearHints, state => {
      state.hints = initialState.hints;
    })

    .addCase(getBackgroundImage, (state,action) => {
    
      state.backgroundImage = action.payload;
     
    })

    .addCase(hideHintsMsg, state => {
      state.hintsMessageVisible = initialState.hintsMessageVisible;
    })
    
    .addCase(showHintsMsg, state => {
      state.hintsMessageVisible = true;
    })
    

    .addCase(clearImages, (state, action) => {
      state.lastFetchedPage = initialState.lastFetchedPage;
      state.images = initialState.images;
      state.subject = action.payload;
    })

    .addCase(showError, (state, action) => {
      if (action.payload) {
        state.error.value = true;
        state.error.code = action.payload;
        
      }
    })
    .addCase(clearError, (state) => {
        state.error.value = false;
        state.error.code = "";
    })

    .addCase(chooseSubject, (state, action) => {
      if (action.payload) {
        state.subject = action.payload;
      }
    })
    .addDefaultCase(() => {});
});

export default imagesReducer;

/////////////////////////////////////////////////////////////////////////////////////////

export function fetchHints(pattern) {
  return (dispatch, getState) => {
    if (pattern && pattern.length > 3) {
      const unsplash = new Unsplash(accessKey);
      unsplash.search
        .photos(pattern, 1, 30)
        .then(toJson)
        .then(json => {
          dispatch(getHints(getOptions(getTags(json.results))));
          
        })
        .catch(err => {
          dispatch(showError(err.message));
        });
    } else {
      if (getState().images.hints.length) {
        dispatch(clearHints());
      }
    }
  };
}

///////////////////////////////////////////////////////////////////////////////

export function fetchImages(pattern) {
  return (dispatch, getState) => {
    const lastSubject = getState().images.subject;
    var lastFetchedPage, collectionLength;
    var shouldFetch = false;

    if (lastSubject === pattern) {
      collectionLength = getState().images.collectionLength;
      lastFetchedPage = getState().images.lastFetchedPage; 
      if (collectionLength > lastFetchedPage) {
        shouldFetch = true;
      } else {
        shouldFetch = false;
        dispatch(showError('Nie ma więcej zdjęć w danej kategorii - nie próbuj ich pobrać'))
      }
    } else {
      dispatch(clearImages(pattern));
      lastFetchedPage = initialState.lastFetchedPage;
      shouldFetch = true;
    }
    if (shouldFetch) {
      const unsplash = new Unsplash(accessKey);
      unsplash.search
        .photos(pattern, lastFetchedPage +1, 30)
        .then(toJson)
        .then(json => {
          dispatch(getImages(json.results));
          dispatch(setCollectionLength(json.total_pages));
        })
        .catch(err => {
          dispatch(showError(err.message));
        });
    }
  };
}





export function fetchBackgroundImage() {
  return (dispatch) => {
    const unsplash = new Unsplash(accessKey);
    unsplash.photos.getRandomPhoto()
  .then(toJson)
  .then(json => {
    dispatch(getBackgroundImage(json));
    const x = document.getElementById("root");
    //console.log(json.urls.regular);
   
    //x.style.background =json.urls.regular;
    //console.log('background', x);
  }).catch(err => {
    dispatch(showError(err.message));
  });
  };
}




