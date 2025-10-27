import React from "react";
import { useEffect, useState } from "react";

import axios from "axios";
import {
  FiCalendar,
  FiUser,
  FiClock,
  FiMapPin,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiEdit3,
} from "react-icons/fi";

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStatus, setEditingStatus] = useState(null);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Not authorized. Please log in.");
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await axios.get(
          "http://localhost:5000/api/reservation",
          config
        );

        setReservations(res.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch reservations");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
      case "approved":
        return <FiCheckCircle className="text-green-500" />;
      case "cancelled":
      case "rejected":
        return <FiXCircle className="text-red-500" />;
      case "pending":
        return <FiAlertCircle className="text-yellow-500" />;
      default:
        return <FiAlertCircle className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
      case "approved":
        return "bg-green-100 text-green-800";
      case "cancelled":
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusUpdate = async (reservationId, newStatus) => {
    try {
      setStatusUpdateLoading(true);
      setError(null);

      //get token
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Not authorized. Please login again.");
        setStatusUpdateLoading(false);
        return;
      }

      //config obj with authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = {
        status: newStatus,
      };

      console.log(
        "Updating status for reservation:",
        reservationId,
        "to:",
        newStatus
      );

      const response = await axios.put(
        `http://localhost:5000/api/reservation/status/${reservationId}`,
        data,
        config
      );
      console.log("Response from server:", response.data);

      // Update the local state
      setReservations((prev) =>
        prev.map((res) =>
          res._id === reservationId ? { ...res, status: newStatus } : res
        )
      );

      setEditingStatus(null);
      console.log("Status updated successfully");

      alert(`Reservation status updated to ${newStatus}`);
    } catch (err) {
      console.error("Failed to update status:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);

      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        "Failed to update reservation status";
      setError(errorMessage);
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  const startEditingStatus = (reservationId) => {
    setEditingStatus(reservationId);
  };

  const cancelEditingStatus = () => {
    setEditingStatus(null);
  };

  //download slip as a pdf
  const downloadSlipAsPdf=(reservation) => {
    console.log("Generating PDF...");
    const slipUrl = `http://localhost:5000/${reservation.slip.replace(/\\/g, '/')}`;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = slipUrl;

    img.onload = () => {
      // Image is loaded, now create the PDF
      const doc = new jsPDF();
      
      const imgWidth = img.width;
      const imgHeight = img.height;
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgHeight * pdfWidth) / imgWidth;

      // (image, format, x-pos, y-pos, width, height)
      doc.addImage(img, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    
      doc.save(`reservation-slip-${reservation._id}.pdf`);
    };
    img.onerror = () => {
      console.error("Could not load image to create PDF.");
      alert("Could not load slip image to create PDF.");
    };

  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Reservations Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage all facility reservations
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              Total: {reservations.length} reservations
            </div>
          </div>
        </div>
      </div>

      {/* Reservations Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <FiUser className="mr-2" />
                    Customer
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <FiMapPin className="mr-2" />
                    Facility
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <FiCalendar className="mr-2" />
                    Date & Time
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <FiClock className="mr-2" />
                    Duration
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(reservations) && reservations.length > 0 ? (
                reservations.map((reservation) => (
                  <tr key={reservation._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                            <FiUser className="h-5 w-5 text-red-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {reservation.user_id
                              ? `${reservation.user_id.fname} ${reservation.user_id.lname}`
                              : "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {reservation.user_id?.email || "No email"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {reservation.facility_id?.facility_name || "N/A"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {reservation.facility_id?.facility_type ||
                          "Unknown type"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(reservation.start).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(reservation.start).toLocaleTimeString()} -{" "}
                        {new Date(reservation.end).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {Math.round(
                        (new Date(reservation.end) -
                          new Date(reservation.start)) /
                          (1000 * 60 * 60)
                      )}{" "}
                      hours
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingStatus === reservation._id ? (
                        <div className="flex items-center space-x-2">
                          <select
                            defaultValue={reservation.status}
                            onChange={(e) =>
                              handleStatusUpdate(
                                reservation._id,
                                e.target.value
                              )
                            }
                            className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
                            disabled={statusUpdateLoading}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button
                            onClick={cancelEditingStatus}
                            className="text-gray-500 hover:text-gray-700"
                            disabled={statusUpdateLoading}
                          >
                            <FiXCircle className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              reservation.status
                            )}`}
                          >
                            <span className="mr-1">
                              {getStatusIcon(reservation.status)}
                            </span>
                            {reservation.status || "Unknown"}
                          </span>
                          <button
                            onClick={() => startEditingStatus(reservation._id)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            title="Edit status"
                          >
                            <FiEdit3 className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {reservation.slip ? (
                          <a
                            href={`http://localhost:5000/${reservation.slip.replace(/\\/g, '/')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-600 hover:text-red-700"
                          >
                            View Slip
                          </a>
                        ) : (
                          "No Slip"
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        No reservations
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        No reservations have been made yet.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
