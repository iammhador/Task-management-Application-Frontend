import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { InputForm } from "../inputField/inputForm";
import { useEffect, useState } from "react";
import SelectField from "../selectField/selectField";

const UpdateTaskModal = ({ setShowModal, showModal, taskId }) => {
  const [taskData, setTaskData] = useState(null);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        if (taskId) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/task/${taskId}`
          );

          setTaskData(response.data);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchTaskData();
  }, [taskId]);
  //@ Update A Task =>
  const { register, handleSubmit, reset } = useForm();
  const handleUpdateTask = async (data) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/task/${taskId}`,
        data
      );
      if (response) {
        toast.success("Task updated successfully");
        reset();
        setShowModal(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleCancelCreateTask = () => {
    setShowModal(false);
  };
  return (
    <div>
      {showModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-5/6 sm:w-2/3 md:w-1/2 lg:w-1/3 rounded-md p-6">
            <p className="text-center text-cyan-500 text-lg font-bold uppercase">
              Update your task
            </p>
            <form
              onSubmit={handleSubmit(handleUpdateTask)}
              className="mt-6 space-y-4"
            >
              <InputForm
                register={register}
                title={"title"}
                type={"text"}
                name={"title"}
                placeholder={taskData?.data?.title}
              />
              <InputForm
                register={register}
                title={"description"}
                type={"text"}
                name={"description"}
                placeholder={taskData?.data?.description}
              />

              <SelectField
                register={register}
                title="status"
                options={[
                  {
                    value: "complete",
                    label: "Complete",
                    colorClass: "text-green-700",
                  },
                  {
                    value: "incomplete",
                    label: "Incomplete",
                    colorClass: "text-red-700",
                  },
                ]}
              />

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-cyan-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Submit
                </button>
                <button
                  onClick={handleCancelCreateTask}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateTaskModal;
