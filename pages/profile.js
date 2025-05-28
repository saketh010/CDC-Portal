// pages/Profile.js
import { useEffect, useState } from 'react';
import GeneralInfo from '../components/Profile/GeneralInfo';
import CollegeInfo from '../components/Profile/CollegeInfo';
import AcademicInfo from '../components/Profile/AcademicInfo';
import ChangePassword from '../components/Profile/ChangePassword';

export async function getServerSideProps({ req, res }) {
  // Check if the token exists in cookies
  const token = req.cookies.token;

  if (!token) {
    // If no token, redirect to login page
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // If authenticated, return page props
  return {
    props: {},
  };
}

const Profile = () => {
  const [userProfile, setUserProfile] = useState({
    username: '',
    email: '',
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    gender: '',
    category: '',
    dateOfBirth: '',
    nationality: '',
    hometown: '',
    currentCity: '',
    batchOfPassing: '',
    degree: '',
    department: '',
    cgpa: Array(8).fill(''),
    tenthPercent: '',
    twelfthPercent: '',
    tenthBoard: '',
    twelfthBoard: '',
  });
  
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    const fetchProfile = async () => {
      const username = localStorage.getItem('username');
      const response = await fetch(`/api/auth/profile?username=${username}`);
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.data);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value
    });
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
  
      {/* Tabs */}
      <div className="flex justify-between border-b-2 border-gray-200 mb-8">
        <button
          className={`py-2 flex-grow text-center text-lg font-medium 
          ${activeTab === 'general' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('general')}
        >
          General Information
        </button>
        <button
          className={`py-2 flex-grow text-center text-lg font-medium 
          ${activeTab === 'college' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('college')}
        >
          College Information
        </button>
        <button
          className={`py-2 flex-grow text-center text-lg font-medium 
          ${activeTab === 'academic' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('academic')}
        >
          Academic Information
        </button>
        <button
          className={`py-2 flex-grow text-center text-lg font-medium 
          ${activeTab === 'changePassword' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('changePassword')}
        >
          Change Password
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        {activeTab === 'general' && (
          <GeneralInfo 
            userProfile={userProfile} 
            handleInputChange={handleInputChange} 
          />
        )}
        {activeTab === 'college' && (
          <CollegeInfo 
            userProfile={userProfile} 
            handleInputChange={handleInputChange} 
          />
        )}
        {activeTab === 'academic' && (
          <AcademicInfo 
            userProfile={userProfile} 
            handleInputChange={handleInputChange} 
          />
        )}
        {activeTab === 'changePassword' && (
          <ChangePassword 
            userProfile={userProfile}
            handleInputChange={handleInputChange} 
          />
        )}

      </div>
    </div>
  );
};

export default Profile;
