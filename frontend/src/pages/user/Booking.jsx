import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UserIcon,
  UserCircleIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

const HOURS = Array.from({ length: 12 }, (_, i) => 8 + i); // 8AM - 8PM

export default function Booking() {
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [myReservations, setMyReservations] = useState([]);
  const [editingReservationId, setEditingReservationId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editReservationData, setEditReservationData] = useState(null);

  const [slip, setSlip] = useState(null);

  const eventOptions = [
    { label: "Casual", value: "casual" },
    { label: "Tournement", value: "tournement" },
  ];

  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <ClockIcon className="h-5 w-5" />;
      case "confirmed":
        return <CheckCircleIcon className="h-5 w-5" />;
      case "cancelled":
        return <XCircleIcon className="h-5 w-5" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/facility");
        setFacilities(res.data);
      } catch (err) {
        Swal.fire("Error", "Failed to load facilities", "error");
      }
    };
    fetchFacilities();
    fetchMyReservations();
    
    // Auto-refresh reservations every 30 seconds to get status updates
    const interval = setInterval(fetchMyReservations, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchBookedSlots = async (facilityId, selectedDate) => {
    if (!facilityId || !selectedDate) return;
    try {
      const res = await axios.get(
        "http://localhost:5000/api/reservation/check/availability-by-date",
        {
          params: {
            facilityId,
            date: selectedDate,
          },
        }
      );
      setBookedSlots(res.data.bookedSlots);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not fetch booked slots", "error");
    }
  };
const fetchMyReservations = async () => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    console.log("No token, cannot fetch reservations.");
    return;
  }

  try {
   //config object
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    //Make the request WITH the config  , filter and send only this users reservations
    const res = await axios.get("http://localhost:5000/api/reservation", config);

    console.log("My reservations:", res.data);
    setMyReservations(res.data);

  } catch (err) {
    console.error("Failed to Fetch reservations", err);
  }
};

useEffect(() => { //for available slots
    if (selectedFacility && date) {
      fetchBookedSlots(selectedFacility._id, date);
    }
  }, [selectedFacility, date]);

  useEffect(() => { // for reservations
    fetchMyReservations();
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    console.log("=== RESERVATION SUBMISSION ===");
    console.log("Token exists:", !!token);
    console.log("User:", user);
    console.log("Selected facility:", selectedFacility);
    console.log("Event type:", eventType);
    console.log("Date:", date);
   

    if (!token) {
      Swal.fire("Login Required", "Please login to book", "warning");
      navigate("/login");
      return;
    }

    if (!selectedFacility || !eventType || !date || !startTime || !endTime) {
      Swal.fire("Incomplete", "Please complete all fields", "info");
      return;
    }

    const reservationStart = `${date}T${startTime}:00`;
    const reservationEnd = `${date}T${endTime}:00`;

    console.log("Start time:", reservationStart);
    console.log("End time:", reservationEnd);
 
    try {
      const formData = new FormData();
      formData.append("facility_id", selectedFacility._id);
      formData.append("eventType", eventType);
      formData.append("start", reservationStart);
      formData.append("end", reservationEnd); 
      if (slip) {
        formData.append("slip", slip);
      }

      console.log("Form data prepared");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      console.log("Making POST request to create reservation...");

      if (editingReservationId) {
        //update reservation
        const response = await axios.put(
          `http://localhost:5000/api/reservation/${editingReservationId}`,
          formData,
          config
        );
        console.log("Update response:", response.data);
        Swal.fire("Updated!", "Reservation updated successfully", "success");
      } else {
        //create new reservation
        const response = await axios.post(
          "http://localhost:5000/api/reservation",
          formData,
          config
        );
        console.log("Create response:", response.data);
        Swal.fire("Success!", "Reservation added successfully", "success");
      }

      // Reset form
      setSelectedFacility(null);
      setEventType("");
      setDate("");
      setStartTime(""); 
      setEndTime("");
      setSlip(null);
      setEditingReservationId(null);
      
      // Refresh reservations
      fetchMyReservations();
      
      // Navigate to reservations page
      navigate("/booking");
      
    } catch (err) {
      console.error("Reservation creation failed:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          err.message || 
                          "Booking Failed";
      
      Swal.fire("Error", errorMessage, "error");
    }
  };

  const handleDelete = async (reservationId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do youo really want tp cancel this reservation?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Cancel it!",
    });

    if (confirm.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `http://localhost:5000/api/reservation/${reservationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Swal.fire(
          "Cancelled",
          "Your reservation has been cancelled.",
          "success"
        );
        fetchMyReservations();
      } catch (err) {
        Swal.fire("Error", "Failed to cancel reservation", "error");
      }
    }
  };

  const handleEdit = (reservation) => {
    const startDate = reservation.start.slice(0, 10);
    const startHour = new Date(reservation.start).getHours();
    const hourStr = `${startHour.toString().padStart(2, "0")}:00`;

    setEditReservationData({
      id: reservation._id,
      facilityId: reservation.facility_id?._id || "",
      eventType: reservation.eventType,
      date: startDate,
      slot: hourStr,
    });
    setIsEditModalOpen(true);
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-red-900 to-black px-4 py-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl mt-20 p-8 bg-black/80 rounded-2xl shadow-lg backdrop-blur-md border border-red-700"
        >
          <h2 className="text-3xl font-bold text-red-500 text-center mb-6">
            Make A Reservation
          </h2>

          {/* Facility selector */}
          <div>
            <label className="block text-red-200 mb-1">
              Choose a facility:
            </label>
            <select
              className="w-full mb-4 px-4 py-2 rounded-lg bg-zinc-900 text-white border border-red-600 focus:outline-none focus:ring-1 focus:ring-red-500"
              value={selectedFacility?._id || ""}
              onChange={(e) => {
                const selected = facilities.find(
                  (f) => f._id === e.target.value
                );
                setSelectedFacility(selected);
                setBookedSlots([]);
                
              }}
            >
              <option value="">--Select Facility--</option>
              {facilities.map((facility) => (
                <option key={facility._id} value={facility._id}>
                  {facility.facility_name}
                </option>
              ))}
            </select>
          </div>

          {/* Event Type */}
          <div>
            <label className="block text-red-200 mb-1">Event Type:</label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full mb-4 px-4 py-2 rounded-lg bg-zinc-900 text-white border border-red-600 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="">--Select Event Type--</option>
              {eventOptions.map((event) => (
                <option key={event.value} value={event.value}>
                  {event.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-red-200 mb-1">Select Date:</label>
            <input
              type="date"
              className="w-full mb-4 px-4 py-2 rounded-lg bg-zinc-900 text-white border border-red-600 focus:outline-none focus:ring-1 focus:ring-red-500"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setBookedSlots([]);
              
              }}
            />
          </div>

{/* Time Slot Pickers */}
<div className="grid grid-cols-2 gap-4 mb-6">
  {/* --- Start Time Dropdown --- */}
  <div>
    <label htmlFor="start-time" className="block text-red-200 mb-2">
      Start Time
    </label>
    <select
      id="start-time"
      value={startTime}
      onChange={(e) => {
        setStartTime(e.target.value);
        setEndTime(""); // Reset end time when start time changes
      }}
      required
      className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-red-500"
    >
      <option value="" disabled>Select start time</option>
      {HOURS.map((hour) => {
        const hourStr = hour.toString().padStart(2, "0") + ":00";
        const isBooked = bookedSlots.includes(hourStr);
        return (
          <option key={hourStr} value={hourStr} disabled={isBooked}>
            {hourStr} {isBooked ? "(Booked)" : ""}
          </option>
        );
      })}
    </select>
  </div>

  {/* --- End Time Dropdown --- */}
  <div>
    <label htmlFor="end-time" className="block text-red-200 mb-2">
      End Time
    </label>
    <select
      id="end-time"
      value={endTime}
      onChange={(e) => setEndTime(e.target.value)}
      disabled={!startTime} // Disable until start time is selected
      required
      className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-red-500"
    >
      <option value="" disabled>Select end time</option>
      {HOURS.map((hour) => {
        // End time is +1 hour, so we map hours 9-23
        const endHourStr = (hour + 1).toString().padStart(2, "0") + ":00";
        
        // Only show end times that are *after* the selected start time
        if (parseInt(hour) < parseInt(startTime)) {
          return null;
        }

        // Check if any slot *between* start and end is booked
        let isSlotInbetweenBooked = false;
        for (let i = parseInt(startTime); i <= hour; i++) {
          const slotToCheck = i.toString().padStart(2, "0") + ":00";
          if (bookedSlots.includes(slotToCheck)) {
            isSlotInbetweenBooked = true;
            break;
          }
        }

        return (
          <option key={endHourStr} value={endHourStr} disabled={isSlotInbetweenBooked}>
            {endHourStr} {isSlotInbetweenBooked ? "(Slot unavailable)" : ""}
          </option>
        );
      })}
    </select>
  </div>
</div>

          {/* Payment slip uploading */}
          <div>
            <label className="block text-red-200 mb-1">Upload payment Slip:</label>
            <input
              type="file"
              name="slip"
              accept="image/*, application/pdf"
              onChange={(e) => setSlip(e.target.files[0])}
              className="w-full mb-4 px-4 py-2 rounded-lg bg-zinc-900 text-white border border-red-600 focus:outline-none focus:ring-1 focus:ring-red-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 shadow-lg shadow-red-500/30"
          >
            Book Now
          </button>
        </form>
      </div>

      {/*/my reservation table */}
      <div className="mt-12 mb-24 max-w-5xl mx-auto bg-white">
        <h2 className="text-2xl font-semibold text-red-500 text-center mb-4">
          My Reservations
        </h2>
        {myReservations.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 shadow-lg">
              <thead className="bg-red-700 text-white">
                <tr>
                  <th className="px-3 py-6 text-left text-xs uppercase tracking-wider">
                    Facility
                  </th>
                  <th className="px-3 py-6 text-left text-xs uppercase tracking-wider">
                    Event Type
                  </th>
                  <th className="px-3 py-6 text-left text-xs uppercase tracking-wider">
                    Start
                  </th>
                  <th className="px-3 py-6 text-left text-xs uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 py-6 text-left text-xs uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {myReservations.map((res) => (
                  <tr key={res._id} className="  hover:bg-zinc-300/50">
                    <td className="p-3 py-6 px-4 whitespace-nowrap text-sm font-semibold text-gray-600">
                      {res.facility_id?.facility_name || "N/A"}
                    </td>
                    <td className="p-3 py-6 px-4 whitespace-nowrap text-sm font-semibold text-gray-600">
                      {res.eventType}
                    </td>
                    <td className="p-3 py-6 px-4 whitespace-nowrap text-sm font-semibold text-gray-600">
                      {new Date(res.start).toLocaleString()}
                    </td>
                    <td className="p-3 py-6 px-4 whitespace-nowrap text-sm font-semibold text-gray-600">
                      <span
                        className={`py-2 px-3 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          res.status
                        )}`}
                      >
                        {getStatusIcon(res.status)}
                        <span className="ml-1">{res.status}</span>
                      </span>
                    </td>
                    <td className="p-3 py-6 px-4 whitespace-nowrap text-sm text-gray-600 flex gap-3">
                      <button
                        onClick={() => handleEdit(res)}
                        disabled = {res.status !== 'pending'}
                        className={
                          res.status !== 'pending'
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-blue-600 hover:text-blue-800'
                        }
                        title={res.status !== 'pending' ? 'Cannot edit a ' + res.status + ' reservation' : 'Edit'}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(res._id)}
                        disabled={res.status !== 'pending'}
                        className={
                          res.status !== 'pending'
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-red-600 hover:text-red-800'
                        }
                         
                        title={res.status !== 'pending' ? 'Cannot cancel a ' + res.status + ' reservation' : 'Cancel'}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-300">No reservations found.</p>
        )}
      </div>

{/* edit reservation form */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-xl mt-20 p-8 bg-black/80 rounded-2xl shadow-lg backdrop-blur-md border border-red-700">
            <h2 className="text-xl font-bold mb-4 text-red-600">
              Edit Reservation
            </h2>

            {/* Facility Selector */}
            <label className="block text-red-200 mb-1">Facility</label>
            <select
              value={editReservationData.facilityId}
              onChange={(e) =>
                setEditReservationData({
                  ...editReservationData,
                  facilityId: e.target.value,
                })
              }
              className="w-full mb-4 px-4 py-2 rounded-lg bg-zinc-900 text-white border border-red-600 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="">-- Select Facility --</option>
              {facilities.map((f) => (
                <option key={f._id} value={f._id}>
                  {f.facility_name}
                </option>
              ))}
            </select>

            {/* Event Type */}
            <label className="block text-red-200 mb-1">Event Type</label>
            <select
              value={editReservationData.eventType}
              onChange={(e) =>
                setEditReservationData({
                  ...editReservationData,
                  eventType: e.target.value,
                })
              }
              className="w-full mb-4 px-4 py-2 rounded-lg bg-zinc-900 text-white border border-red-600 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="">-- Select Event Type --</option>
              {eventOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* Date */}
            <label className="block text-red-200 mb-1">Date</label>
            <input
              type="date"
              value={editReservationData.date}
              onChange={(e) =>
                setEditReservationData({
                  ...editReservationData,
                  date: e.target.value,
                })
              }
              className="w-full mb-4 px-4 py-2 rounded-lg bg-zinc-900 text-white border border-red-600 focus:outline-none focus:ring-1 focus:ring-red-500"
            />

            {/* Time Slot */}
            <label className="block text-red-200 mb-1">Time Slot</label>
            <select
              value={editReservationData.slot}
              onChange={(e) =>
                setEditReservationData({
                  ...editReservationData,
                  slot: e.target.value,
                })
              }
              className="w-full mb-4 px-4 py-2 rounded-lg bg-zinc-900 text-white border border-red-600 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="">-- Select Time Slot --</option>
              {HOURS.map((h) => {
                const hStr = `${h.toString().padStart(2, "0")}:00`;
                return (
                  <option key={hStr} value={hStr}>
                    {hStr} - {(h + 1).toString().padStart(2, "0")}:00
                  </option>
                );
              })}
            </select>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  const token = localStorage.getItem("token");
                  const { id, facilityId, eventType, date, slot } =
                    editReservationData;

                  if (!facilityId || !eventType || !date || !slot) {
                    Swal.fire(
                      "Incomplete",
                      "All fields are required",
                      "warning"
                    );
                    return;
                  }

                  const startHour = parseInt(slot.split(":")[0]);
                  const start = `${date}T${slot}:00`;
                  const end = `${date}T${(startHour + 1)
                    .toString()
                    .padStart(2, "0")}:00`;

                  try {
                    await axios.put(
                      `http://localhost:5000/api/reservation/${id}`,
                      {
                        facility_id: facilityId,
                        eventType,
                        start,
                        end,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    Swal.fire(
                      "Updated!",
                      "Reservation updated successfully",
                      "success"
                    );
                    setIsEditModalOpen(false); // close modal
                    fetchMyReservations(); // refresh data
                  } catch (err) {
                    console.error(err);
                    Swal.fire(
                      "Error",
                      err.response?.data?.error || "Failed to update",
                      "error"
                    );
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
