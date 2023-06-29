import classes from './Modal.module.css';
import React from 'react';
import ReactDOM  from 'react-dom';
const BackDrop=props=>{
    return <div className={classes.backdrop} onClick={props.onHide}></div>
};
const ModalOverlay=(props)=>{
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
}
const portalElements=document.getElementById('overlays');

const Modal=(props)=>{

    return (
        <React.Fragment>
           {ReactDOM.createPortal(<BackDrop onHide={props.onHide}/>,portalElements)}
           {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElements)}
        </React.Fragment>
    );


};

export default Modal;