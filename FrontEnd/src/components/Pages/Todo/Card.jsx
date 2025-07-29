import React, { useState } from "react";
import { Eye, Edit, Trash2, X, Calendar, CheckCircle, Clock } from "lucide-react";
import Edittask from "./EditTask";
import { deletetodos } from "../../../../Services/TodoServices";
import { toast } from "react-toastify";
import Swal from 'sweetalert2/dist/sweetalert2.js'
function Card({ data ,getalldata}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [editItem, setEditItem] = useState(null); // ✅ Track which item to edit

  const openEditModel = (item) => {
    setEditItem(item); // ✅ Set item to be edited
    setEditModel(true); // ✅ Open modal
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength) => {
    if (!text) {return} '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

const deleteitem = async (id) => {
  try {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded m-5",
        cancelButton:
          "bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded m-5",
      },
      buttonsStyling: false
    });

    const result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    });

    if (result.isConfirmed) {
      await deletetodos(id);
      toast.success("Deleted Successfully");
      getalldata();
      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error"
      });
    }

  } catch (error) {
    console.log(error);
  }
};



  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="w-full mx-auto">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-5 pb-5 text-center">Task Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((item, i) => (
            <div
              key={item.id || i}
              className="cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100" onClick={() => openModal(item)}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                    {truncateText(item?.title, 25)}
                  </h3>
                  <div className="flex items-center">
                    {item?.isComplete ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Clock className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                </div>

                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    item?.isComplete ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {item?.isComplete ? "Completed" : "In Progress"}
                </span>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4">
                  {truncateText(item?.description, 80)}
                </p>
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(item?.createdAt)}
                </div>

                {item?.description && (
                  <button
                    onClick={() => openModal(item)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    See more
                  </button>
                )}
              </div>

              {/* Actions */}
              <div className="px-6 pb-6">
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModel(item)} // ✅ Send current item to edit
                    className="cursor-pointer flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                  </button>
                  <button
                  onClick={()=>deleteitem(item?._id)}
                   className="cursor-pointer flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center">
                    <Trash2 className="w-4 h-4 mr-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform animate-in zoom-in-95 duration-400 ease-out border border-slate-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Task Details</h2>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-slate-200 rounded-lg transition-colors duration-200 group"
              >
                <X className="w-5 h-5 text-slate-600 group-hover:text-slate-800" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Title Section */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-slate-900 leading-tight pr-4">
                    {selectedItem.title}
                  </h3>
                  <div className="flex items-center shrink-0">
                    {selectedItem.isComplete ? (
                      <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1 rounded-full">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-700">Complete</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 bg-amber-50 px-3 py-1 rounded-full">
                        <Clock className="w-5 h-5 text-red-600" />
                        <span className="text-sm font-medium text-amber-700">Pending</span>
                      </div>
                    )}
                  </div>
                </div>

                <span
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold border ${
                    selectedItem.isComplete
                      ? "bg-emerald-500 text-white border-emerald-500 shadow-emerald-200 shadow-lg"
                      : "bg-amber-500 text-white border-amber-500 shadow-amber-200 shadow-lg"
                  }`}
                >
                  {selectedItem.isComplete ? "Completed" : "In Progress"}
                </span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-1 h-6 bg-slate-700 rounded-full mr-3"></div>
                  <h4 className="text-lg font-bold text-slate-800">Description</h4>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                  <p className="text-slate-700 leading-relaxed text-base">
                    {selectedItem.description}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-1 h-6 bg-slate-700 rounded-full mr-3"></div>
                  <h4 className="text-lg font-bold text-slate-800">Created Date</h4>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                  <div className="flex items-center text-slate-700">
                    <div className="p-3 bg-slate-200 rounded-xl mr-4">
                      <Calendar className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                      <span className="text-lg font-semibold text-slate-800 block">
                        {formatDate(selectedItem.createdAt)}
                      </span>
                      <span className="text-sm text-slate-500">
                        Task created on
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ✅ Edit Modal - Only rendered once */}
      {editModel && editItem && (
        <Edittask item={editItem} setEditmodel={setEditModel} getalldata={getalldata} />
      )}
    </div>
  );
}

export default Card;
