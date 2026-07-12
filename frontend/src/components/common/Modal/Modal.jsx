import "../../../styles/Common/Modal.css";
import { X } from "lucide-react";

const Modal = ({
  open = false,
  title = "",
  subtitle = "",
  size = "md",
  loading = false,
  children,
  onClose,
}) => {

  if (!open) return null;

  return (

    <div
      className="modal-overlay"
      onClick={onClose}
    >

      <div
        className={`modal-container modal-${size}`}
        onClick={(e) => e.stopPropagation()}
      >

        <div className="modal-header">

          <div className="modal-header-content">

            <h2>{title}</h2>

            {

              subtitle && (

                <p>{subtitle}</p>

              )

            }

          </div>

          <button
            className="modal-close-btn"
            onClick={onClose}
            disabled={loading}
          >

            <X size={20} />

          </button>

        </div>

        <div className="modal-body">

          {children}

        </div>

      </div>

    </div>

  );

};

export default Modal;