import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FcBusinessman,
  FcAddressBook,
  FcClock,
  FcApproval,
  FcPhone,
  FcInfo,
  FcOvertime,
  FcPackage,
} from "react-icons/fc";

import { FiUser } from "react-icons/fi";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStatus, setEditingStatus] = useState(null);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
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
          "http://localhost:5000/api/membership",
          config
        );
        setUsers(res.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch Users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
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

  // status update goes here....

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              User Management
            </h1>
            <p className="text-gray-600 mt-1">Manage all Users</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              Total: {users.length} users
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
                    <FcBusinessman className="mr-2" />
                    First Name
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">Last Name</div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <FcAddressBook className="mr-2" />
                    Email
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <FcInfo className="mr-2" />
                    NIC
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <FcPackage className="mr-2" />
                    Package
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <FcPhone className="mr-2" />
                    Phone
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <FcOvertime className="mr-2" />
                    Registered Date
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <FcApproval className="mr-2" />
                    Status
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {users.length > 0 ? (
                users.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-6">
                                <div className="h-6 w-6 rounded-full bg-red-100 flex items-center my-2 justify-center">
                                    <FiUser className="h-5 w-5 text-red-600" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                    {item.user_id?.fname}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td className="px-4 py-2">{item.user_id?.lname}</td>
                    <td className="px-4 py-2">{item.email}</td>
                    <td className="px-4 py-2">{item.NIC}</td>
                    <td className="px-4 py-2">{item.pkg}</td>
                    <td className="px-4 py-2">{item.phone}</td>
                    <td className="px-4 py-2">{item.status}</td>
                    <td className="px-4 py-2">
                      {new Date(item.reg_date).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-gray-500">
                    No records found
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
