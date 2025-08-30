import Header from './components/Header';
import AddWorkoutForm from './components/AddWorkoutForm';
import { useModal } from './hooks/useModal';
import BaseModal from './components/BaseModal';


function App() {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <Header />
      <button className='bg-primary text-text-secondary py-2 px-4 w-full' onClick={openModal}>
        Add Workout
      </button>
      <BaseModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <AddWorkoutForm />
      </BaseModal>
    </>
  )
}

export default App;