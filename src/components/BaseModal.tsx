import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";

Modal.setAppElement("#root");

const customStyles = {
	content: {
		inset: "16px"
	},
};

type BaseModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

export default function BaseModal({ isOpen, onRequestClose, children }: BaseModalProps) {

  return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel="Base modal"
			style={customStyles}
		>
			{children}
			<button className="absolute top-2 right-2" onClick={onRequestClose}>
				<IoMdClose size={24} />
			</button>
		</Modal>
	);
}