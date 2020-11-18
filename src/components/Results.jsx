import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchImages /*fetchHints*/ } from "../redux/imagesReducer";
import { fetchDetails } from "../redux/modalReducer";
import DetailsModalBody from "./DetailsModalBody";
import MyModal from "./Modal";
import Form from "./Form";
import Subject from "./details/Subject";
import Wrapper from "./details/Wrapper";
import debounce from "lodash/debounce";
import ErrorMessage from "./ErrorMessage";
import ContainerWithImages from "./ContainerWithImages";

//////////////////////////////////////////////////////////////////////////////////////////////////
const UnconnectedImages = props => {
  const { subject, fetchImages, fetchDetails } = props;

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
      <Wrapper class ='images__background'>
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

const mapStateToProps = state => ({
  subject: state.images.subject,
});

const mapDispatchToProps = dispatch => ({
  fetchImages: str => dispatch(fetchImages(str)),
  fetchDetails: str => dispatch(fetchDetails(str)),
});

const Images = withRouter(connect(mapStateToProps, mapDispatchToProps)(UnconnectedImages));
export default Images;
