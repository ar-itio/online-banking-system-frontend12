import React from 'react'

// Modal.js
const Modal = ({ onClose, children }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      {/*<button onClick={onClose}></button>*/}  
      </div>
    </div>
  );
};

  export default Modal;
  


