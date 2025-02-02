import { useState } from "react";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify"; 
interface Detail {
  task: string;
  priority: string;
  status: boolean;
}

const useTask = () => {
  const [tasks, setTasks] = useState<Detail[]>([]);
  const [details, setDetails] = useState<Detail>({
    task: "",
    priority: "",
    status: false,
  });

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const isChecked = (e.target as HTMLInputElement).checked;
    setDetails({
      ...details,
      [name]: type === "checkbox" ? isChecked : value,
    });
  };

  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (details.task && details.priority) {
      setTasks([...tasks, details]);
      setDetails({ task: "", priority: "", status: false });
      toast.success("Task added successfully!", {
      
        position: "top-center",
        autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
      });
    }
  };

  const toggleStatus = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, status: !task.status } : task
    );
    setTasks(updatedTasks);
    toast.info("Task status updated!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    toast.error("Task deleted.", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return { addTask, handleInput, toggleStatus, deleteTask, tasks, details };
};

export default useTask;
