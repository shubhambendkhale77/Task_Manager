import { useState } from "react";
import useTask from "../hooks/useTask";
import {
  Trash2,
  Plus,
  CheckCircle,
  Circle,
  Layout,
  Clock,
  Sun,
  Moon,
  Search,
} from "lucide-react";

const Task = () => {
  const { addTask, handleInput, toggleStatus, deleteTask, tasks, details } =
    useTask();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [isDark, setIsDark] = useState(false);

  const getPriorityColor = (priority: any) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-600 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-600 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-600 border-green-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") return task.status;
      if (filter === "active") return !task.status;
      return true;
    })
    .filter(
      (task) =>
        task.task.toLowerCase().includes(search.toLowerCase()) ||
        task.priority.toLowerCase().includes(search.toLowerCase())
    );

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status).length,
    high: tasks.filter((t) => t.priority === "high").length,
  };

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      } py-8 px-4`}
    >
      <div
        className={`w-full max-w-3xl mx-auto ${
          isDark ? "bg-gray-800" : "bg-white"
        } rounded-xl shadow-xl overflow-hidden transition-colors duration-200`}
      >
        <div
          className={`p-6 ${isDark ? "bg-gray-800" : "bg-white"} border-b ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h1
              className={`text-2xl font-bold flex items-center gap-2 ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              <Layout className="w-6 h-6 text-violet-500" />
              Task Manager
            </h1>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg ${
                isDark
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-600"
              } hover:opacity-80 transition-all`}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-blue-500" />
              )}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div
              className={`p-4 rounded-lg ${
                isDark ? "bg-gray-700/50" : "bg-violet-100/50"
              }`}
            >
              <div
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-violet-600"
                }`}
              >
                {stats.total}
              </div>
              <div
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-violet-500"
                }`}
              >
                Total Tasks
              </div>
            </div>
            <div
              className={`p-4 rounded-lg ${
                isDark ? "bg-gray-700/50" : "bg-emerald-100/50"
              }`}
            >
              <div
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-emerald-600"
                }`}
              >
                {stats.completed}
              </div>
              <div
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-emerald-500"
                }`}
              >
                Completed
              </div>
            </div>
            <div
              className={`p-4 rounded-lg ${
                isDark ? "bg-gray-700/50" : "bg-rose-100/50"
              }`}
            >
              <div
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-rose-600"
                }`}
              >
                {stats.high}
              </div>
              <div
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-rose-500"
                }`}
              >
                High Priority
              </div>
            </div>
          </div>

          <form onSubmit={addTask} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Enter Your Task"
                name="task"
                value={details.task}
                onChange={handleInput}
                className={`flex-1 px-4 py-2 rounded-lg ${
                  isDark
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-800 border-gray-200"
                } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <select
                name="priority"
                value={details.priority}
                onChange={handleInput}
                className={`w-32 px-4 py-2 rounded-lg ${
                  isDark
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-800 border-gray-200"
                } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </div>
          </form>
        </div>

        <div
          className={`p-4 ${
            isDark
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-50 border-gray-200"
          } border-b flex gap-4 items-center`}
        >
          <div className="flex items-center gap-2 flex-1">
            <Search
              className={`w-5 h-5 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`flex-1 px-3 py-1.5 rounded-md ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-800 border-gray-200"
              } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={`px-3 py-1.5 rounded-md ${
              isDark
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-gray-800 border-gray-200"
            } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="all">All Tasks</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="p-6">
          {filteredTasks.map((task, index) => (
            <div
              key={index}
              className={`group flex items-center justify-between p-4 mb-3 rounded-lg ${
                isDark
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-50 hover:bg-gray-100"
              } transition-all`}
            >
              <div className="flex items-center gap-4 flex-1">
                <button
                  onClick={() => toggleStatus(index)}
                  className="focus:outline-none hover:opacity-80 transition-opacity"
                >
                  {task.status ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                <div className="flex flex-col">
                  <span
                    className={`font-medium ${
                      task.status ? "line-through opacity-50" : ""
                    } ${isDark ? "text-white" : "text-gray-800"}`}
                  >
                    {task.task}
                  </span>
                  <div className="flex gap-2 items-center mt-1">
                    <span
                      className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </span>
                    <span
                      className={`text-xs ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      } flex items-center gap-1`}
                    >
                      <Clock className="w-3 h-3" />
                      Added today
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => deleteTask(index)}
                className={`p-2 rounded-full opacity-0 group-hover:opacity-100 ${
                  isDark
                    ? "text-gray-400 hover:bg-gray-600"
                    : "text-gray-500 hover:bg-gray-200"
                } transition-all focus:outline-none focus:ring-2 focus:ring-red-500`}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}

          {filteredTasks.length === 0 && (
            <div
              className={`text-center ${
                isDark ? "text-gray-400" : "text-gray-500"
              } py-8`}
            >
              {search
                ? "No tasks match your search."
                : "No tasks yet. Add one to get started!"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
