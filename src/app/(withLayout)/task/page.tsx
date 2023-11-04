"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Loading from "../../loading";
import { MdEdit, MdDelete } from "react-icons/md";

const TaskPage = ({ searchParams }) => {
  const { userId } = searchParams;

  const formatDate = (timeString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedDate = new Date(timeString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const {
    isLoading,
    error,
    data: taskData,
    refetch,
  } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get(`http://localhost:5000/api/v1/task/${userId}`)
        .then((res) => res.data),
    refetchInterval: 7000,
  });
  refetch();

  if (isLoading) return <Loading />;

  if (error) {
    toast.error("An error has occurred: " + error);
  }

  const handleDelete = (data) => {
    setDeleteId(data);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:5000/api/v1/task/${deleteId}`)
      .then((res) => {
        toast.success("Task deleted successfully:");
        setShowModal(false);
        setDeleteId(null);
      })
      .catch((error) => {
        toast.error("An error has occurred: " + error);
      });
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  return (
    <div className="my-10 mx-5 h-screen">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 ">
        {taskData?.data ? (
          taskData?.data?.map((task) => (
            <section key={task._id} className="w-full">
              <div className="relative items-center w-full p-6 mx-auto max-w-md bg-white shadow-xl rounded-xl">
                <div className="flex justify-evenly items-center mb-4">
                  <button className="px-2 py-1 mx-1 text-blue-500">
                    <MdEdit className="text-2xl" />
                  </button>
                  <span className="block mx-1 text-xs font-semibold text-center text-cyan-500 capitalize">
                    {formatDate(task?.createdAt)}
                  </span>
                  <button
                    onClick={() => handleDelete(task?._id)}
                    className="px-2 py-1 mx-1 text-red-500"
                  >
                    <MdDelete className="text-2xl" />
                  </button>
                </div>

                <div className="text-center">
                  <h4 className="mt-4 text-xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-2xl">
                    {task?.title.length > 50
                      ? task?.title.slice(0, 50) + "..."
                      : task?.title}
                  </h4>
                  <p className="mt-3 text-base leading-relaxed text-gray-500">
                    {task?.description.length > 100
                      ? task?.description.slice(0, 100) + "..."
                      : task?.description}
                  </p>
                </div>
              </div>
            </section>
          ))
        ) : (
          <p className="text-cyan-500">No data found</p>
        )}
        {showModal && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-1/3 rounded-md p-6">
              <p>Are you sure you want to delete this task?</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Confirm
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center my-5">
        <button className="uppercase bg-cyan-500 text-gray-50 font-medium py-3 px-5 rounded-lg">
          Add Task
        </button>
      </div>
    </div>
  );
};

const queryClient = new QueryClient();

const AccountManagePageQueryClient = ({ searchParams }) => (
  <QueryClientProvider client={queryClient}>
    <TaskPage searchParams={searchParams} />
  </QueryClientProvider>
);

export default AccountManagePageQueryClient;
