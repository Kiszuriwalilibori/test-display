import React  from "react";
import { connect } from "react-redux";
import { hideModal, showModal,fetchDetails } from "../redux/modalReducer";

const UnconnectedImage = props => {
    const { prop, showModal, hideModal,fetchDetails } = props;
  

    
    return (
      <div className="fotos__box">
        <img onClick={fetchDetails(prop.id)} loading="lazy" className="fotos__image" alt={prop.description} sizes="(min-width: 1335px) 416px, (min-width: 992px) calc(calc(100vw - 72px) / 3), (min-width: 768px) calc(calc(100vw - 48px) / 2), 100vw" srcSet={prop.urls} itemProp="thumbnailUrl"></img>
        <div>
          {prop.tags.map((item, index) => (
            <span className="fotos__tag" key={index}>
              {" " + item.title || ""}
            </span>
          ))}
        </div>
      </div>
    );
  };

  





  const mapStateToProps = state => ({
    // images: state.images.images,
    // subject: state.images.subject,
    // isModalVisible: state.modal.isVisible,
  });
  
  const mapDispatchToProps = dispatch => ({
    fetchDetails: str => dispatch(fetchDetails(str)),
    hideModal: () => dispatch(hideModal()),
    showModal: () => dispatch(showModal()),
  });
  const Image = connect(mapStateToProps, mapDispatchToProps)(UnconnectedImage);
  
  export default Image;

