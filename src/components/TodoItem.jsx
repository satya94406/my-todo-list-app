import { Trash2 } from "lucide-react"; 
import { motion } from "framer-motion"; 

function TodoItem({ todoName, todoDate, priority, onDelete }) {
  // Priority badge styling
  const priorityColors = {
    High: "bg-red-100 text-red-600 border-red-400",
    Medium: "bg-yellow-100 text-yellow-600 border-yellow-400",
    Low: "bg-green-100 text-green-600 border-green-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center justify-between bg-white shadow-md rounded-2xl p-4 my-3 border hover:shadow-lg transition-all"
    >
      <div className="flex flex-col items-start">
        <h3 className="text-lg font-semibold text-gray-800">{todoName}</h3>
        <p className="text-sm text-gray-500">📅 {todoDate}</p>
      </div>

      <span
        className={`px-3 py-1 text-sm font-medium rounded-full border ${priorityColors[priority] || "bg-gray-100 text-gray-600"}`}
      >
        {priority}
      </span>

      <button
        onClick={onDelete}
        className="ml-4 flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-md transition-all"
      >
        <Trash2 size={18} />
        Delete
      </button>
    </motion.div>
  );
}

export default TodoItem;
