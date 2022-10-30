import { TodoType} from "../utils/types";
import {
  TrashIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { enUS } from "date-fns/locale";
import { format } from "date-fns";
import { useState } from "react";
import ConfirmationDelete from "./ConfirmationDelete";
import UpdateTodoModal from "./UpdateTodoModal";

interface Props {
  todo: TodoType;
}

const Todo: React.FC<Props> = ({ todo }) => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const closeConfirmation = () => setOpenConfirmation(false);
  const closeModal = () => setOpenUpdateModal(false);

  return (
    <>
      {openConfirmation && (
        <ConfirmationDelete
          id={todo.id}
          closeConfirmation={closeConfirmation}
        />
      )}
      {openUpdateModal && (
        <UpdateTodoModal closeModal={closeModal} todo={todo} />
      )}
      <div
        key={todo.id}
        className="w-[95%] md:w-[80%] bg-gray-600 p-2 rounded-sm"
      >
        <div className="flex items-start space-x-2">
          <p
            className={`text-left flex-1 text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium tracking-wide ${
              todo.completed && "line-through"
            }`}
          >
            {todo.title}
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setOpenUpdateModal(true)}
              className="hover:scale-110 transition duration-300 ease-in-out"
              title="edit"
            >
              <PencilSquareIcon className="w-6 text-gray-300" />
            </button>
            <button
              onClick={() => setOpenConfirmation(true)}
              className="hover:scale-110 transition duration-300 ease-in-out"
              title="delete"
            >
              <TrashIcon className="w-6 text-red-600" />
            </button>
          </div>
        </div>
        <div className="mt-4 flex items-end space-x-2">
          <CalendarDaysIcon className="w-6 text-gray-300" />
          <p className="text-gray-300 font-medium text-sm md:text-base">
            {format(new Date(todo.createdAt), "dd LLL", { locale: enUS })}
          </p>
        </div>
      </div>
    </>
  );
};

export default Todo;
