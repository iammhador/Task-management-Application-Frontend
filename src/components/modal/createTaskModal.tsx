import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { InputForm } from "../inputField/inputForm";
import SelectField from "../selectField/selectField";

const CreateTaskModal = ({ setShowModal, showModal, userId }) => {
  //@ Create A Task =>
  const { register, handleSubmit, reset } = useForm();
  const handleCreateTask = async (data: {
    title: string;
    description: string;
    priority: string;
    userId: string;
  }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/task`,
        {
          title: data?.title,
          description: data?.description,
          priority: data?.priority,
          status: "incomplete",
          userId: userId,
        }
      );

      if (response) {
        toast.success("Task created successfully");
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
              Add your task
            </p>
            <form
              onSubmit={handleSubmit(handleCreateTask)}
              className="mt-6 space-y-4"
            >
              <InputForm
                register={register}
                title={"title"}
                type={"text"}
                name={"title"}
                placeholder={"Enter your title"}
              />
              <InputForm
                register={register}
                title={"description"}
                type={"text"}
                name={"description"}
                placeholder={"Enter your description"}
              />

              <SelectField
                register={register}
                title="priority"
                options={[
                  { value: "Low", label: "Low", colorClass: "text-green-500" },
                  {
                    value: "Medium",
                    label: "Medium",
                    colorClass: "text-blue-500",
                  },
                  { value: "High", label: "High", colorClass: "text-red-500" },
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

export default CreateTaskModal;
