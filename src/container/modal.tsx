import { type ModalProps } from "../type/container";

// CSS
// import styles from '@scss/homepage.module.scss'

const Modal = (props: ModalProps) => {
  const closeModal = () => {
    props.update(false);
  };

  return (
    <div>
      <div>
        <span
          onClick={(e) => {
            closeModal();
          }}
        >
          &#x2715;
          {/* <span>FERMER</span> */}
        </span>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
