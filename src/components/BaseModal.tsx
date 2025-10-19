import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";

Modal.setAppElement("#root");

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
			style={{
				overlay: {
					position: "fixed",
					inset: 0,
					backgroundColor: "rgba(255, 255, 255, 0.75)",
				},
				content: {
					position: "absolute",
					top: "50%",
					left: "50%",
					right: "auto",
					bottom: "auto",
					transform: "translate(-50%, -50%)",
					border: "1px solid #ccc",
					background: "#fff",
					overflow: "auto",
					WebkitOverflowScrolling: "touch",
					borderRadius: "4px",
					outline: "none",
					padding: "20px 40px",
				},
			}}
		>
			{children}
			<button className="absolute top-1 right-1" onClick={onRequestClose}>
				<IoMdClose size={24} />
			</button>
		</Modal>
	);
}