import axios from "axios";
import toast from "react-hot-toast";

const DeleteTaskModal = ({
  deleteId,
  setShowModal,
  setDeleteId,
  showModal,
}) => {
  //@ Delete A Task =>

  const handleConfirmDelete = () => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/task/${deleteId}`)
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
    <div>
      {showModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-5/6 sm:w-2/3 md:w-1/2 lg:w-1/3 rounded-md p-6">
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
  );
};

export default DeleteTaskModal;
