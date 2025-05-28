// components/CollegeInfo.js
import React, { useState, useEffect } from 'react';

const CollegeInfo = ({ userProfile }) => {
    const [batch, setBatch] = useState('');
    const [resumes, setResumes] = useState([]);
    const [codingProfiles, setCodingProfiles] = useState([]);

    const [newResume, setNewResume] = useState({ name: '', link: '' });
    const [newCodingProfile, setNewCodingProfile] = useState({ name: '', link: '' });

    const [errors, setErrors] = useState({
        batch: '',
        resumeLink: '',
        codingProfileLink: ''
    });

    // Set initial form data from userProfile prop
    useEffect(() => {
        if (userProfile) {
            setBatch(userProfile.batchOfPassing || '');
            setResumes(userProfile.resumes || []);
            setCodingProfiles(userProfile.codingProfiles || []);
        }
    }, [userProfile]);

    const handleAddResume = () => {
        if (newResume.name && newResume.link) {
            setResumes([...resumes, newResume]);
            setNewResume({ name: '', link: '' });
        } else {
            setErrors(prev => ({ ...prev, resumeLink: 'Please provide both name and link for the resume' }));
        }
    };

    const removeResume = (index) => {
        setResumes(resumes.filter((_, i) => i !== index));
    };

    const handleAddCodingProfile = () => {
        if (newCodingProfile.platform && newCodingProfile.accountId) {
            setCodingProfiles([...codingProfiles, newCodingProfile]);
            setNewCodingProfile({ name: '', link: '' });
        } else {
            setErrors(prev => ({ ...prev, codingProfileLink: 'Please provide both platform and account ID for the coding profile' }));
        }
    };

    const removeCodingProfile = (index) => {
        setCodingProfiles(codingProfiles.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate batch field
        if (!batch) {
            alert('Please provide the batch of passing.');
            return;
        }
        const username = localStorage.getItem('username');

        const updatedData = {
            batchOfPassing: batch,
            resumes: resumes,
            codingProfiles: codingProfiles,
            username: username,
        };
        const response = await fetch('/api/auth/updatecollegeinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });
    
        const result = await response.json();
        if (result.success) {
            alert('College information updated successfully');
        } else {
            alert('Error updating college information');
        }
    };
    

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">College Information</h2>

            {/* Batch of Passing Section */}
            <div className="mb-8">
                <label className="block text-gray-700 font-semibold mb-2">Batch of Passing</label>
                <input
                    type="text"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    placeholder="Enter Year (e.g., 2025)"
                    className="input input-bordered w-full border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 rounded-md"
                />
            </div>

            {/* Resume Upload Section */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Resumes</h3>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <input
                        type="text"
                        value={newResume.name}
                        onChange={(e) => setNewResume({ ...newResume, name: e.target.value })}
                        placeholder="Resume Name"
                        className="input input-bordered w-full border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 rounded-md"
                    />
                    <input
                        type="url"
                        value={newResume.link}
                        onChange={(e) => setNewResume({ ...newResume, link: e.target.value })}
                        placeholder="Resume Drive Link"
                        className="input input-bordered w-full border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 rounded-md"
                    />
                    <button onClick={handleAddResume} className="btn btn-primary rounded-md w-full md:w-auto">
                        Add Resume
                    </button>
                </div>
                {errors.resumeLink && <p className="text-red-500 text-sm">{errors.resumeLink}</p>}
                <ul className="space-y-2">
                    {resumes.map((resume, index) => (
                        <li key={index} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                            <div>
                                <span className="font-semibold text-gray-800">{resume.name}: </span>
                                <a href={resume.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    {resume.link}
                                </a>
                            </div>
                            <button onClick={() => removeResume(index)} className="btn btn-error btn-sm ml-4">Remove</button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Coding Profile Section */}
            <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Coding Profiles</h3>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <input
                        type="text"
                        value={newCodingProfile.name}
                        onChange={(e) => setNewCodingProfile({ ...newCodingProfile, name: e.target.value })}
                        placeholder="Platform Name (e.g., LeetCode, GitHub)"
                        className="input input-bordered w-full border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 rounded-md"
                    />
                    <input
                        type="text"
                        value={newCodingProfile.accountId}
                        onChange={(e) => setNewCodingProfile({ ...newCodingProfile, link: e.target.value })}
                        placeholder="Account ID"
                        className="input input-bordered w-full border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 rounded-md"
                    />
                    <button onClick={handleAddCodingProfile} className="btn btn-primary rounded-md w-full md:w-auto">
                        Add Profile
                    </button>
                </div>
                {errors.codingProfileLink && <p className="text-red-500 text-sm">{errors.codingProfileLink}</p>}
                <ul className="space-y-2">
                    {codingProfiles.map((profile, index) => (
                        <li key={index} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                            <div>
                                <span className="font-semibold text-gray-800">{profile.name}: </span>
                                <a href={profile.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    {profile.link}
                                </a>
                            </div>
                            <button onClick={() => removeCodingProfile(index)} className="btn btn-error btn-sm ml-4">Remove</button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-3 mt-4">
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-primary w-full"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default CollegeInfo;
