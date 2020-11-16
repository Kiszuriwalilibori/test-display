import * as React from "react";

const Image = props => {
    const { prop } = props;
  
    return (
      <figure className="fotos__box">
        <img
          data-id={prop.id}
          loading="lazy"
          className="fotos__image"
          alt={prop.description}
          sizes="(min-width: 1335px) 416px, (min-width: 992px) calc(calc(100vw - 72px) / 3), (min-width: 768px) calc(calc(100vw - 48px) / 2), 100vw"
          srcSet={prop.urls}
          itemProp="thumbnailUrl"
          onLoad={e => {e.target.closest("figure").classList.add("visible");e.target.closest("figure").classList.add("fade-in")}}
        ></img>
        <figcaption className ='container-for-tags'>
          {prop.tags.map((item, index) => ( 
            <span className="fotos__tag" key={index} data-image_hint ={item.title}>
              {" " + item.title || ""}
            </span>
          ))}
        </figcaption>
      </figure>
    );
  };
  
  export default Image;