/* eslint-disable @typescript-eslint/no-explicit-any */
import { TimeOutline, CreateOutline, TrashOutline } from "react-ionicons";
import { TaskT } from "../../types";

interface TaskProps {
  task: TaskT;
  provided: any;
  onEdit: () => void;
  onDelete: () => void;
}

const Task = ({ task, provided, onEdit, onDelete }: TaskProps) => {
  const { title, description, priority, deadline, image, alt, tags } = task;

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="w-full cursor-grab bg-[#fff] flex flex-col justify-between gap-3 items-start shadow-sm rounded-xl px-3 py-4 transition-all duration-300 hover:shadow-md hover:scale-[1.03] hover:bg-gray-100"
    >
      {image && alt && (
        <img src={image} alt={alt} className="w-full h-[170px] rounded-lg" />
      )}
      <div className="flex items-center gap-2">
        {tags.map((tag) => (
          <span
            key={tag.title}
            className="px-[10px] py-[2px] text-[13px] font-medium rounded-md"
            style={{ backgroundColor: tag.bg, color: tag.text }}
          >
            {tag.title}
          </span>
        ))}
      </div>
      <div className="w-full flex items-start flex-col gap-0">
        <span className="text-[15.5px] font-medium text-[#555]">{title}</span>
        <span className="text-[13.5px] text-gray-500">{description}</span>
      </div>
      <div className="w-full border border-dashed"></div>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-1">
          <TimeOutline color={"#666"} width="19px" height="19px" />
          <span className="text-[13px] text-gray-700">{deadline} mins</span>
        </div>
        <div
          className={`w-[60px] rounded-full h-[5px] ${
            priority === "high"
              ? "bg-red-500"
              : priority === "medium"
              ? "bg-orange-500"
              : "bg-blue-500"
          }`}
        ></div>
      </div>
      {/* Edit & Delete Buttons */}
      <div className="w-full flex justify-end gap-2 mt-2">
        <button
          onClick={onEdit}
          className="p-1 bg-blue-500 text-white rounded-lg flex items-center gap-1"
        >
          <CreateOutline color={"#fff"} />
          Edit
        </button>
        <button
          onClick={onDelete}
          className="p-1 bg-red-500 text-white rounded-lg flex items-center gap-1"
        >
          <TrashOutline color={"#fff"} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
