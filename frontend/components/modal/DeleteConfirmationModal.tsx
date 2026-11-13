"use client";

import { FiAlertTriangle, FiX, FiTrash2 } from "react-icons/fi";

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-100 rounded-full">
                <FiAlertTriangle className="text-red-500 text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">{title}</h3>
                <p className="text-gray-600 mt-1">{message}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <FiX className="text-xl" />
            </button>
          </div>
          
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center gap-2 transition-colors disabled:bg-red-400"
            >
              {isLoading ? (
                <span className="animate-spin">...</span>
              ) : (
                <>
                  <FiTrash2 />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}