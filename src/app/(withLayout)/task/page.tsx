"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Loading from "../../loading";
import { MdEdit, MdDelete } from "react-icons/md";
import moment from "moment";
import DeleteTaskModal from "../../../components/modal/DeleteTaskModal";
import CreateTaskModal from "../../../components/modal/createTaskModal";
import UpdateTaskModal from "../../../components/modal/updateTaskModal";
import { getFromLocalStorage } from "../../utils/localStorage";
import { jwtDecode } from "jwt-decode";
import { setTimeout } from "timers";

const TaskPage = ({ searchParams }) => {
  const { searchParamsUserId } = searchParams;
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showUpdateTaskModal, setShowUpdateTaskModal] = useState(false);
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
  const [taskUpdateId, setTaskUpdateId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [delaySearch, setDelaySearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [page, setPage] = useState();
  const token = getFromLocalStorage("token");
  const decoded = jwtDecode(token) as { userInfo: { _id: string } } | null;
  const decodedUserId = decoded?.userInfo?._id;
  const userId = searchParamsUserId ? searchParamsUserId : decodedUserId;

  const query = {};
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      setDelaySearch(searchQuery);
    }, 3000);
    return () => clearTimeout(delayedSearch);
  }, [searchQuery, page]);

  if (!!delaySearch) {
    query["searchParams"] = delaySearch;
  }

  const formatDate = (timeString) => {
    const formattedDate = moment(timeString).format("YYYY-MM-DD HH:mm:ss");
    return formattedDate;
  };

  const {
    isLoading,
    error,
    data: taskData,
    refetch,
  } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/task/user/${userId}`, {
          params: query,
        })
        .then((res) => res.data),
    refetchInterval: 7000,
  });
  refetch();

  if (isLoading) return <Loading />;

  if (error) {
    toast.error("An error has occurred: " + error);
  }

  const handleCreateTask = () => {
    setShowCreateTaskModal(true);
  };

  const handleUpdateTask = (data) => {
    setTaskUpdateId(data);
    setShowUpdateTaskModal(true);
  };

  const handleDelete = (data) => {
    setDeleteId(data);
    setShowDeleteTaskModal(true);
  };

  const handleReset = () => {
    setSearchQuery("");
    setDelaySearch("");
  };

  const handleFilter = async () => {
    if (sortOrder === "desc") {
      setSortOrder("asc");
      await refetch();
    } else {
      setSortOrder("desc");
      await refetch();
    }
    setSortBy("createdAt");
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="my-10 mx-10">
      {taskData?.data.length > 0 && (
        <form className="flex flex-col md:flex-row items-center justify-center mb-10">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="px-3 py-2 mx-1 text-sm rounded-md border-2 border-cyan-500 md:mb-0"
          />

          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2 mx-1 my-2 text-sm font-medium rounded-md bg-red-500 text-gray-50"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleFilter}
            className="px-3 py-2 mx-1 my-2 text-sm font-medium rounded-md bg-cyan-500 text-gray-50"
          >
            Filter
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {taskData?.data ? (
          taskData?.data?.map((task) => (
            <section key={task?._id} className="w-full">
              <div className="relative items-center w-full p-6 mx-auto max-w-md bg-white shadow-xl rounded-xl">
                <div className="flex justify-evenly items-center mb-4">
                  <button
                    onClick={() => handleUpdateTask(task?._id)}
                    className="px-2 py-1 mx-1 text-blue-500"
                  >
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
      </div>

      <div className="flex justify-center items-center my-5">
        <button
          onClick={() => handleCreateTask()}
          className="uppercase bg-cyan-500 text-gray-50 font-medium py-3 px-5 rounded-lg"
        >
          Add Task
        </button>
        <CreateTaskModal
          setShowModal={setShowCreateTaskModal}
          showModal={showCreateTaskModal}
          userId={userId}
        />
      </div>

      {taskData?.data.length > 0 && (
        <>
          <div className="flex justify-center space-x-1 mt-10 text-gray-100">
            {[...Array(taskData?.meta?.totalPages)].map((_, index) => (
              <button
                key={index}
                type="button"
                title={`Page ${index + 1}`}
                className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md bg-gray-900 text-gray-50"
                onClick={() => handlePageClick(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}

      <UpdateTaskModal
        setShowModal={setShowUpdateTaskModal}
        showModal={showUpdateTaskModal}
        taskId={taskUpdateId}
      />
      <DeleteTaskModal
        deleteId={deleteId}
        setShowModal={setShowDeleteTaskModal}
        setDeleteId={setDeleteId}
        showModal={showDeleteTaskModal}
      />
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
