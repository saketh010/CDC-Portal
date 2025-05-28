//components/Profile/GeneralInfo.js
import React, { useState, useEffect } from 'react';

const GeneralInfo = ({ userProfile }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    email: '',
    gender: '',
    category: '',
    dob: '',
    nationality: '',
    hometown: '',
    currentCity: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (userProfile) {
        setFormData({
            firstName: userProfile.firstName || '',
            middleName: userProfile.middleName || '',
            lastName: userProfile.lastName || '',
            phone: userProfile.phone || '',
            email: userProfile.email || '',
            gender: userProfile.gender || '',
            category: userProfile.category || '',
            dob: userProfile.dob  || '', 
            nationality: userProfile.nationality || '',
            hometown: userProfile.hometown || '',
            currentCity: userProfile.currentCity || '',
        });
    }
}, [userProfile]);

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validation for email and phone
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors({
        ...errors,
        email: emailRegex.test(value) ? '' : 'Enter a valid email address.',
      });
    } else if (name === 'phone') {
      const phoneRegex = /^[6-9]\d{9}$/;
      setErrors({
        ...errors,
        phone: phoneRegex.test(value) ? '' : 'Enter a valid 10-digit Indian phone number.',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.email || errors.phone) {
      alert('Please correct the errors before submitting');
      return;
    }

    const response = await fetch('/api/auth/updateprofile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...formData, username: userProfile.username}),
    });

    const result = await response.json();
    if (result.success) {
      alert('Profile updated successfully');
    } else {
      alert('Error updating profile');
    }
  };

  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">General Information</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* First Name, Middle Name, Last Name */}
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          className="input input-bordered border-gray-300 w-full focus:outline-none focus:ring focus:ring-blue-500 rounded-md"
        />
        <input
          type="text"
          name="middleName"
          value={formData.middleName}
          onChange={handleInputChange}
          placeholder="Middle Name"
          className="input input-bordered border-gray-300 w-full focus:outline-none focus:ring focus:ring-blue-500 rounded-md"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
          className="input input-bordered border-gray-300 w-full focus:outline-none focus:ring focus:ring-blue-500 rounded-md"
        />

        {/* Email and Phone */}
        <div className="md:col-span-2">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="input input-bordered border-gray-300 w-full focus:outline-none focus:ring focus:ring-blue-500 rounded-md"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className="input input-bordered border-gray-300 w-full focus:outline-none focus:ring focus:ring-blue-500 rounded-md"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Gender Dropdown */}
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          className="select select-bordered border-gray-300 w-full focus:outline-none focus:ring focus:ring-blue-500 rounded-md"
        >
          <option value="" disabled>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        {/* Category Dropdown */}
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="select select-bordered border-gray-300 w-full focus:outline-none focus:ring focus:ring-blue-500 rounded-md"
        >
          <option value="" disabled>Select Category</option>
          <option value="general">General</option>
          <option value="obc">Other Backward Class (OBC)</option>
          <option value="sc">Scheduled Caste (SC)</option>
          <option value="st">Scheduled Tribes (ST)</option>
          <option value="ews">Economically Weaker Section (EWS)</option>
          <option value="pwd">Person with Disability (PWD)</option>
        </select>

        {/* Date of Birth and Nationality */}
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
          className="input input-bordered border-gray-300 w-full focus:outline-none focus:ring focus:ring-blue-500 rounded-md"
        />
        <input
          type="text"
          name="nationality"
          value={formData.nationality}
          onChange={handleInputChange}
          placeholder="Nationality"
          className="input input-bordered border-gray-300 w-full focus:outline-none focus:ring focus:ring-blue-500 rounded-md"
        />

        {/* Hometown and Current City */}
        <input
          type="text"
          name="hometown"
          value={formData.hometown}
          onChange={handleInputChange}
          placeholder="Hometown"
          className="input input-bordered border-gray-300 w-full focus:outline-none focus:ring focus:ring-blue-500 rounded-md"
        />
        <input
          type="text"
          name="currentCity"
          value={formData.currentCity}
          onChange={handleInputChange}
          placeholder="Current City"
          className="input input-bordered border-gray-300 w-full focus:outline-none focus:ring focus:ring-blue-500 rounded-md"
        />

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-3 mt-4">
          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default GeneralInfo;
