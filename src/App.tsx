import Task from "./components/Task"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App:React.FC=()=>{
  return (
    <>
  <div>
  <Task/>
  <ToastContainer />
  </div>
    </>
  )
}

export default App
