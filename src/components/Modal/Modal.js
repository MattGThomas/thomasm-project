import React from "react";

import "./modal.css";

const Modal = ({ close, show }) => {
  const modalClass = show ? "modal display-block" : "modal display-none";

  return (
    <div className={modalClass}>
      <section className="modal-main">
        <p>
          to delete an expense, simply input the expense id,
          <br />
          then click the delete expense button
        </p>
      </section>
    </div>
  );
};
export default Modal;
