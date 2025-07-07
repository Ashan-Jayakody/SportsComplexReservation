import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {UserIcon} from '@heroicons/react/24/outline';
import athlete from "../../assets/athlete.jpg";



const validateRequired = (value) => value.trim() !== "";

export default function MembershipRegister() {
  // available membership packages to register
  const membershippackages = [
    {
      id: 1,
      name: "Basic",
      description:
        "Perfect for casual users who want access to essential sports facilities without a long-term commitment. Ideal for individuals who prefer pay-as-you-go flexibility.",
      facilities: "Access to gym, badminton, and table tennis(limited hours).",
      validFor: "1 month",
      price: 3000,
    },
    {
      id: 2,
      name: "Silver",
      description:
        "Designed for regular users looking to stay active with more benefits and extended access. Great value for those who visit the complex multiple times a week.",
      facilities:
        "Unlimited access to gym, badminton, table tennis & swimming pool. Priority booking for courts and classes. One free personal training session.",
      validFor: "6 months",
      price: 5500,
    },
    {
      id: 3,
      name: "Gold",
      description:
        "Best suited for sports enthusiasts and long-term fitness planners. Includes full access to all premium facilities, classes, and priority services.",
      facilities:
        "All Silver benfits + , Unlimited access to facilities, weekly personal training sessions, free entry to tournaments and events",
      validFor: "1 year",
      price: 12000,
    },
  ];

  // declares a state variable named formData and a
  // function setFormData to update that state.
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    reg_date: "",
    NIC: "",
    membershipType: ""
    
  });

  const [formErrors, setFormErrors] = useState({});

  //form validation
  const validateForm = () => {
    const errors = {
      fname: "",
      lname: "",
      email: "",
      phone: "",
      reg_date: "",
      NIC: "",
      membershipType: ""
    };

    // Validate first name
    if (!validateRequired(formData.fname)) {
      errors.fname = "Enter a valid name";
    }

    // Validate last name
    if (!validateRequired(formData.lname)) {
      errors.lname = "Enter a valid name";
    }

    // Validate email
    if (!validateRequired(formData.email)) {
      errors.email = "Email is required";
    }

    // Validate phone
    if (!validateRequired(formData.phone)) {
      errors.phone = "Phone number is required";
    }

    // Validate reg date
    if (!validateRequired(formData.reg_date)) {
      errors.reg_date = "Date is required";
    }

    // Validate NIC
    if (!validateRequired(formData.NIC)) {
      errors.NIC = "NIC is required";
    }

    setFormErrors(errors);
    return !Object.values(errors).some((error) => error !== "");
  };

  //update the form data dynamically
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //send form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/users", formData);
      Swal.fire("Success!", "user registered successfully", "success");
      setFormData({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        reg_date: "",
        NIC: "",
        membershipType: ""
   
      });
    } catch (err) {
      Swal.fire(
        "Error!",
        err.response?.data?.message || "Failed to register user"
      );
    }
  };

  return (
    <div>
      <div className="flex mx-auto bg-black h-[700px] w-full">
        <div
          className=" flex-1 mx-16 mt-6 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${athlete})` }}
        >
          <div className="flex mx-10 items-center mt-20 my-8 gap-5">
            <div className=" text-white p-4 w-1/4">
              <h2 className="text-2xl font-bold">
                Welcome to Champion’s Court Complex – Where Every Player Becomes
                a Champion!
              </h2>
            </div>
            {membershippackages.map((pkg) =>(
                <div className="bg-gradient-to-b from-black/90 via-gray-800/90 to-red-800/50  text-white p-4  bg-opacity-50 w-[300px] min-w-[300px] max-w-[300px] h-[450px] min-h-[450px] max-h-[450px] shrink-0 shadow-xl transition duration-700 ease-in-out transform hover:scale-105 ">

                    <h3 className="font-mono text-3xl font-bold mb-3 text-red-700 ">{pkg.name}</h3>
                    <p className="whitespace-pre-line text-md leading-relaxed">{pkg.description}</p>
                    <div className="text-sm space-y-1">
                        <p className="mb-5 mt-5"><span className="whitespace-pre-line font-semibold text-red-700 text-lg">Facilities:</span>{' '}{pkg.facilities}</p>
                        <p className="text-lg "><span className="font-semibold text-red-700 text-lg">Valid For:</span> {pkg.validFor}</p>    
                    </div>
                    <div className="flex">
                        <p className="mt-5 flex mx-auto items-center font-bold text-4xl">Rs {pkg.price}</p>
                    </div>
                   
                    
                </div>

            ))}
            
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className=" max-w-md mx-auto mt-20 p-6 bg-white shadow rounded"
      >
        <h2 className="text-2xl font-bold mb-4">Register User</h2>

        <input
          type="text"
          name="fname"
          value={formData.fname}
          onChange={handleChange}
          placeholder="First name"
          className="w-full p-2 my-3 border"
        />
        {formErrors.fname && <p className="text-red-500 text-sm">{formErrors.fname}</p>}

        <input
          type="text"
          name="lname"
          value={formData.lname}
          onChange={handleChange}
          placeholder="Last name"
          className="w-full p-2 my-3 border"
        />
        {formErrors.lname && <p className="text-red-500 text-sm">{formErrors.lname}</p>}

        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 my-3 border"
        />
        {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Contact No"
          className="w-full p-2 my-3 border"
        />
        {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}

        <input
          type="date"
          name="reg_date"
          value={formData.reg_date}
          onChange={handleChange}
          className="w-full p-2 my-3 border"
        />
        {formErrors.reg_date && <p className="text-red-500 text-sm">{formErrors.reg_date}</p>}

        <input
          type="text"
          name="NIC"
          value={formData.NIC}
          onChange={handleChange}
          placeholder="NIC"
          className="w-full p-2 my-3 border"
        />
        {formErrors.NIC && <p className="text-red-500 text-sm">{formErrors.NIC}</p>}

        <select
            name="membershipType"
            value={formData.membershipType}
            onChange={handleChange}
            className="w-full p-2 my-3 border"
        >
            <option value="">Select Membership</option>
            {membershippackages.map((pkg) =>(
                <option key={pkg.id} value={pkg.name}> 
                    {pkg.name}
                </option>
            ))}
        </select>    

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
