import React, { Component } from 'react'
import ReactDom from 'react-dom';
import './Modal.css';

const modalRoot = document.getElementById('modal-root');


export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }
    componentDidMount(){
        // const abortController = new AbortController()//Method to clean up after fetch calls => just to close the promise properly 
        // const signal = abortController.signal
        // signal;
              
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount(){
        modalRoot.removeChild(this.el);
        // this.abortController.abort();
    }
    render() {
        return ReactDom.createPortal(this.props.children, this.el);
    }
}
