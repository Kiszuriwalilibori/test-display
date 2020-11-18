import * as React from 'react';
import {useDispatch} from 'react-redux';

const DetailsModalBody = props => {
  console.log(props.previous, props.next);
const dispatch = useDispatch();
  return (props?

    <div className="modalbody__container">
      <div className="modal-close__wrapper">
        <button className="modal-close__button" type ='button' onClick={() => dispatch({ type: 'MODAL_HIDE' })} >
        <svg width="32" height="32" className="modal-close__svg" version="1.1" viewBox="0 0 32 32" aria-hidden="false">
          <path d="M25.33 8.55l-1.88-1.88-7.45 7.45-7.45-7.45-1.88 1.88 7.45 7.45-7.45 7.45 1.88 1.88 7.45-7.45 7.45 7.45 1.88-1.88-7.45-7.45z"></path></svg>
        </button>
      </div>
      <aside className="modalbody__aside left">
        <div className="modalbody__arrow-box">
          <svg data-id={props.previous} viewBox="0 0 32 32" className={props.previous ? "modalbody__arrow-svg visible" :"modalbody__arrow-svg"}>
            <path d="M20.6667 24.6666l-2 2L8 16 18.6667 5.3333l2 2L12 16l8.6667 8.6666z"></path>
          </svg>
        </div>
      </aside>

      <article className="modalbody">
        <header className="modalbody__header">
          <div className="modalbody__header-author">
            <div className="author-data">
              <div className="modalbody__header-face">
                <img className="modalbody__header-image" src={props.profile_image} alt={props.author} />
              </div>
              <div className="modalbody__header-name-twitter">
                <div className="modalbody__header-name">{props.author}</div>
                <div className="modalbody__header-twitter">{"@" + props.author}</div>
              </div>
            </div>
          </div>
          <div className="modalbody__header-icons">
            <div className="icon-wrapper">
              <button className="icon-button">
                <svg className="icon-svg" width="32" height="32" viewBox="0 0 32 32" >
                  <path d="M17.4 29c-.8.8-2 .8-2.8 0l-12.3-12.8c-3.1-3.1-3.1-8.2 0-11.4 3.1-3.1 8.2-3.1 11.3 0l2.4 2.8 2.3-2.8c3.1-3.1 8.2-3.1 11.3 0 3.1 3.1 3.1 8.2 0 11.4l-12.2 12.8z"></path>
                </svg>
              </button>
            </div>
            <div className="icon-wrapper">
              <button className="icon-button">
                <svg className="icon-svg" width="32" height="32" viewBox="0 0 32 32">
                  <path d="M14 3h4v26h-4zM29 14v4h-26v-4z"></path>
                </svg>
              </button>
            </div>
          </div>
        </header>

        <img alt={props.author} className="modalbody__image" sizes="(max-width: 767px) 100vw, (max-width: 532px) 500px, (max-height: 521px) 500px, (min-aspect-ratio: 3711/2562) calc((calc(100vh - 175px)) * 1.44848), calc(100vw - 32px)" srcSet={props.urls} />

        <footer className="modalbody__header footer">
          <div className="modalbody__header-author footer">
            <svg width="32" height="32" className="footer__svg" version="1.1" viewBox="0 0 32 32" aria-hidden="false">
              <path d="M16 0c-6.7 0-12 5.3-12 12 0 8.6 8.6 17.3 11.2 19.7.4.4 1.1.4 1.5 0 2.7-2.4 11.3-11.1 11.3-19.7 0-6.7-5.3-12-12-12zm0 18c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"></path>
            </svg>
            <p>{props.location}</p>
          </div>

          <div className="icon-wrapper right">
            <button className="icon-button">
              <svg className="icon-svg" width="32" height="32" viewBox="0 0 32 32">
                <path d="M0 26c0 1.7.2 3.3.6 4.9.2.9.7.9 1 0 2.1-5.3 5.5-10.3 11.1-11.3h3.3v4.4c0 2 1.2 2.6 2.6 1.4l12.8-11c.7-.6.7-1.6 0-2.3l-12.8-11c-1.4-1.3-2.6-.6-2.6 1.3v4.7c-9.6 1.6-16 9.4-16 18.9z"></path>
              </svg>
              <span className ='icon-button__text'>Share</span>
            </button>
          </div>

          <div className="icon-wrapper">
            <button className="icon-button">
              <svg className="icon-svg" width="32" height="32" viewBox="0 0 32 32" >
                <path d="M16 0c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm2 25c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1v-12c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v12zm0-16c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v2z"></path>
              </svg>
              <span className ='icon-button__text'>Info</span>
            </button>
          </div>
        </footer>
      </article>
      <aside className="modalbody__aside right">
        <div className="modalbody__arrow-box">
          <svg  data-id={props.next} viewBox="0 0 32 32" className={props.next? "modalbody__arrow-svg visible" :"modalbody__arrow-svg"}>
            <path d="M11.3333 7.3333l2-2L24 16 13.3333 26.6666l-2-2L20 16l-8.6667-8.6667z"></path>
          </svg>
        </div>
      </aside>
    </div>:null
  );
}


export default DetailsModalBody;

