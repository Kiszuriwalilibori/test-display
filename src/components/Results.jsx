import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchImages} from "../redux/imagesReducer";
import { fetchDetails } from "../redux/modalReducer";
import DetailsModalBody from "./DetailsModalBody";
import MyModal from "./Modal";
import Form from "./Form";
import Subject from "./details/Subject";
import Wrapper from "./details/Wrapper";
import debounce from "lodash/debounce";
import ErrorMessage from "./ErrorMessage";
import ContainerWithImages from "./ContainerWithImages";
import PropTypes from "prop-types";
//////////////////////////////////////////////////////////////////////////////////////////////////
const UnconnectedImages = props => {
  const { fetchImages, fetchDetails } = props;

  useEffect(() => {
    window.addEventListener(
      "click",
      debounce(e => {
        const id = e?.target?.dataset?.image_hint;
        if (id) {
          fetchImages(id);
        }
      }, 200),
      [fetchImages]
    );

    return () => {
      window.removeEventListener(
        "click",
        debounce(e => {
          const id = e?.target?.dataset?.id;
          if (id) {
            fetchImages(id);
          }
        }, 300),
        [fetchImages]
      );
    };
  }, [fetchDetails, fetchImages]);

  return (
    <Wrapper class="images__background">
      <ErrorMessage />
      <Wrapper class="fotos__wrapper--form">
        <Form />
      </Wrapper>
      <MyModal body={DetailsModalBody} />
      <Subject />
      <ContainerWithImages />
    </Wrapper>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchImages: str => dispatch(fetchImages(str)),
  fetchDetails: str => dispatch(fetchDetails(str)),
});

const Images = withRouter(connect(null, mapDispatchToProps)(UnconnectedImages));
export default Images;

 UnconnectedImages.propTypes = { fetchImages: PropTypes.func, fetchDetails: PropTypes.func };
