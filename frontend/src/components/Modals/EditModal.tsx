import { useState } from "react";

const EditModal = ({ isOpen, onClose, task, handleEditTask }: any) => {
  const [updatedTask, setUpdatedTask] = useState(task);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold">Edit Task</h2>
        <input
          type="text"
          className="w-full p-2 mt-2 border rounded"
          placeholder="Title"
          value={updatedTask.title}
          onChange={(e) =>
            setUpdatedTask({ ...updatedTask, title: e.target.value })
          }
        />
        <textarea
          className="w-full p-2 mt-2 border rounded"
          placeholder="Description"
          value={updatedTask.description}
          onChange={(e) =>
            setUpdatedTask({ ...updatedTask, description: e.target.value })
          }
        />
        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={() => handleEditTask(updatedTask)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
