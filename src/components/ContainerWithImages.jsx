
import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import Image from './SingleImage';
import Block from "./details/BlockForBottomControl";
import handleViewport from "react-in-viewport";
import { fetchImages} from "../redux/imagesReducer";
import { fetchDetails } from "../redux/modalReducer";


const ViewportBlock = handleViewport(Block);

const UnconnectedImagesContainer =(props)=>{
const {images, fetchDetails, fetchImages, subject} = props;


const handleScrollBottom = useCallback(
  debounce(() => {
    fetchImages(subject);
  }, 300),
  [fetchImages, subject]
);


useEffect(() => {

  window.addEventListener(
    "click",
    debounce(e => {
      const id = e?.target?.dataset?.id;
      if (id) {
        fetchDetails(id);
      }
    }, 300),
    [fetchDetails]
  );
},[])


return (images && images.length ?
<section className="fotos__container" id="fotos__container">
        <div className="fotos__wrapper">
          <div className="fotos__grid">
            {images.map((item, index) => (
              <Image key={index} prop={item} />
            ))}
          </div>
        </div>
        <ViewportBlock onEnterViewport={() => handleScrollBottom()} />
  </section>:null)
}

const mapStateToProps = state => ({
  images: state.images.images,
  subject: state.images.subject,
  
});

const mapDispatchToProps = dispatch => ({
  fetchImages: str => dispatch(fetchImages(str)),
  fetchDetails: str => dispatch(fetchDetails(str)),
  
});

const ContainerWithImages = connect(mapStateToProps, mapDispatchToProps)(UnconnectedImagesContainer);
export default ContainerWithImages;




