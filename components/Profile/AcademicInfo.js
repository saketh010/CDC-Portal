import React, { useState, useEffect } from 'react';

const AcademicInfo = ({ userProfile }) => {
    const [academicData, setAcademicData] = useState({
        tenthYear: '',
        tenthBoard: '',
        tenthPercent: '',
        twelfthYear: '',
        twelfthBoard: '',
        twelfthPercent: '',
        degree: '',
        department: '',
        activeBacklog: '',
        previousBacklog: '',
        cgpa: Array(8).fill(''),
    });

    useEffect(() => {
        if (userProfile) {
            setAcademicData({
                tenthYear: userProfile.tenthYear || '',
                tenthBoard: userProfile.tenthBoard || '',
                tenthPercent: userProfile.tenthPercent || '',
                twelfthYear: userProfile.twelfthYear || '',
                twelfthBoard: userProfile.twelfthBoard || '',
                twelfthPercent: userProfile.twelfthPercent || '',
                degree: userProfile.degree || '',
                department: userProfile.department || '',
                activeBacklog: userProfile.activeBacklog || '',
                previousBacklog: userProfile.previousBacklog || '',
                cgpa: userProfile.cgpa || Array(8).fill(''),
            });
        }
    }, [userProfile]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAcademicData({
            ...academicData,
            [name]: value,
        });
    };

    const handleCGPAChange = (index, value) => {
        const updatedCGPA = [...academicData.cgpa];
        updatedCGPA[index] = value;
        setAcademicData({ ...academicData, cgpa: updatedCGPA });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/auth/updateacademic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...academicData, username: userProfile.username }),
        });

        const result = await response.json();
        if (result.success) {
            alert('Academic information updated successfully');
        } else {
            console.error('Error:', result.message);
            alert('Error updating academic information');
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Academic Information</h2>

            <form onSubmit={handleSubmit}>
                {/* Line 1: 10th Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                        type="text"
                        name="tenthYear"
                        value={academicData.tenthYear}
                        onChange={handleInputChange}
                        placeholder="10th Pass Year"
                        className="input input-bordered border-gray-300 w-full focus:outline-none focus:ring focus:ring-blue-500 rounded-md"
                    />
                    <input
                        type="text"
                        name="tenthBoard"
                        value={academicData.tenthBoard}
                        onChange={handleInputChange}
                        placeholder="10th Board"
                        className="input input-bordered border-gray-300 w-full focus:outline-none focus:ring focus:ring-blue-500 rounded-md"
                    />
                    <input
                        type="text"
                        name="tenthPercent"
                        value={academicData.tenthPercent}
                        onChange={handleInputChange}
                        placeholder="10th Percentage"
                        className="input input-bordered border-gray-300 w-full focus:outline-none focus:ring focus:ring-blue-500 rounded-md"
                    />
                </div>

                {/* Line 2: 12th Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                        type="text"
                        name="twelfthYear"
                        value={academicData.twelfthYear}
                        onChange={handleInputChange}
                        placeholder="12th Pass Year"
                        className="input input-bordered border-gray-300 w-full focus:outline-none focus:ring focus:ring-blue-500 rounded-md"
                    />
                    <input
                        type="text"
                        name="twelfthBoard"
                        value={academicData.twelfthBoard}
                        onChange={handleInputChange}
                        placeholder="12th Board"
                        className="input input-bordered border-gray-300 w-full focus:outline-none focus:ring focus:ring-blue-500 rounded-md"
                    />
                    <input
                        type="text"
                        name="twelfthPercent"
                        value={academicData.twelfthPercent}
                        onChange={handleInputChange}
                        placeholder="12th Percentage"
                        className="input input-bordered border-gray-300 w-full focus:outline-none focus:ring focus:ring-blue-500 rounded-md"
                    />
                </div>

                {/* Line 3: Degree and Department Dropdowns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <select
                        name="degree"
                        value={academicData.degree}
                        onChange={handleInputChange}
                        className="select select-bordered w-full focus:outline-none focus:border-blue-500"
                    >
                        <option value="" disabled>Select Degree</option>
                        <option value="B.Tech">Bachelor of Technology (B.Tech)</option>
                        <option value="M.Sc">Master of Sciences (M.Sc)</option>
                    </select>

                    <select
                        name="department"
                        value={academicData.department}
                        onChange={handleInputChange}
                        className="select select-bordered w-full focus:outline-none focus:border-blue-500"
                    >
                        <option value="" disabled>Select Department</option>
                        <option value="CSE">Department of Computer Science and Engineering</option>
                        <option value="ECE">Department of Electronics and Communication Engineering</option>
                        <option value="EE">Department of Electrical Engineering</option>
                        <option value="AI">Department of Artificial Intelligence</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <select
                        name="activeBacklog"
                        value={academicData.activeBacklog}
                        onChange={handleInputChange}
                        className="select select-bordered w-full focus:outline-none focus:border-blue-500"
                    >
                        <option value="" disabled>Any Active Backlogs?</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>

                    <select
                        name="previousBacklog"
                        value={academicData.previousBacklog}
                        onChange={handleInputChange}
                        className="select select-bordered w-full focus:outline-none focus:border-blue-500"
                    >
                        <option value="" disabled>Any Previous Backlogs?</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>



                {/* CGPA Section */}
                <h3 className="text-lg font-bold mt-4 mb-2">CGPA (Enter for each semester)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {academicData.cgpa.map((value, index) => (
                        <div key={index} className="mb-2">
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => handleCGPAChange(index, e.target.value)}
                                placeholder={`Semester ${index + 1} CGPA`}
                                className="input input-bordered border-gray-300 w-full focus:outline-none focus:ring focus:ring-blue-500 rounded-md"
                            />
                        </div>
                    ))}
                </div>

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

export default AcademicInfo;
