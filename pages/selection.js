import { useState, useEffect } from 'react';

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

export default function PostJobPage() {
    const [selectedCompany, setSelectedCompany] = useState("Choose Company");
    const [selectedYear, setSelectedYear] = useState("Choose Year");

    const data = {
        "Zomato": {
            "2023": [
                { id: 1, rollNo: 'U21CS001', name: 'Arya', email: 'arya@gmail.com', type: 'Intern' },
                { id: 2, rollNo: 'U21CS002', name: 'Prateek', email: 'prateek@gmail.com', type: 'Intern' },
                { id: 3, rollNo: 'U20CS100', name: 'Shreya', email: 'shreya@gmail.com', type: 'FT' },
                { id: 4, rollNo: 'U21CS098', name: 'Shravya', email: 'shravya@gmail.com', type: 'Intern' },
            ],
            "2024": [
                { id: 5, rollNo: 'U21CS103', name: 'Charvik', email: 'charvik@gmail.com', type: 'FT' },
                { id: 6, rollNo: 'U22CS067', name: 'Aryan', email: 'aryankambalapally@gmail.com', type: 'Intern' },
                { id: 7, rollNo: 'U22CS034', name: 'Sathvik', email: 'sathvikcheedalla@gmail.com', type: 'Intern' },
            ],
        },
        "EY": {
            "2023": [
                { id: 8, rollNo: 'U21CS104', name: 'Divya', email: 'divya@gmail.com', type: 'Intern' },
            ],
            "2024": [
                { id: 9, rollNo: 'U22CS105', name: 'Dharmil', email: 'dharmilh5@gmail.com', type: 'Intern' },
                { id: 10, rollNo: 'U22CS106', name: 'Saketh', email: 'sakethkanuri4@gmail.com', type: 'Intern' },
                { id: 11, rollNo: 'U22CS062', name: 'Harsh', email: 'sonkar@gmail.com', type: 'Intern' },
                { id: 12, rollNo: 'U21CS123', name: 'Rahul', email: 'rahuld76@gmail.com', type: 'FT' },
            ],
        },
        "MasterCard": {
            "2023": [
                { id: 13, rollNo: 'U20CS004', name: 'Dev', email: 'dev@gmail.com', type: 'FT' },
                { id: 14, rollNo: 'U20CS024', name: 'Yash', email: 'yash@gmail.com', type: 'FT' },
                { id: 15, rollNo: 'U21CS026', name: 'Jay', email: 'jay@gmail.com', type: 'Intern' },
                { id: 16, rollNo: 'U21CS058', name: 'shruti', email: 'shruti@gmail.com', type: 'Intern' },
            ],
            "2024": [
                { id: 17, rollNo: 'U21CS069', name: 'Drake', email: 'drake@gmail.com', type: 'FT' },
                { id: 18, rollNo: 'U22CS097', name: 'Pooja', email: 'pooja@gmail.com', type: 'Intern' },
                { id: 19, rollNo: 'U22CS010', name: 'Shikar', email: 'Shikar@gmail.com', type: 'Intern' },
                { id: 20, rollNo: 'U22CS017', name: 'Manas', email: 'manas@gmail.com', type: 'Intern' },
            ],
        },
        
    };

    // Handle company selection and reset year
    const handleCompanySelect = (company) => {
        setSelectedCompany(company);
        setSelectedYear("Choose Year"); // Reset the year when a new company is selected
    };

    // Handle year selection
    const handleYearSelect = (year) => {
        setSelectedYear(year);
    };

    // Filter data based on selected company and year
    const filteredData =
        selectedCompany !== "Choose Company" &&
        selectedYear !== "Choose Year" &&
        data[selectedCompany] &&
        data[selectedCompany][selectedYear]
            ? data[selectedCompany][selectedYear]
            : [];

    // Get the available years for the selected company
    const availableYears =
        selectedCompany !== "Choose Company" ? Object.keys(data[selectedCompany]) : [];

    return (
        <div className="flex flex-col items-center min-h-screen">
            {/* Header */}
            <div className="w-full bg-gray-800 text-white py-4 text-center">
                <h1 className="text-xl font-bold">Previous Selections</h1>
            </div>

            {/* Dropdowns */}
            <div className="w-full flex justify-center py-4 gap-4">
                {/* Company Dropdown */}
                <div className="dropdown dropdown-hover">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn gap-0 m-1 h-8"
                    >
                        {selectedCompany}
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                        {Object.keys(data).map((company) => (
                            <li key={company}>
                                <a onClick={() => handleCompanySelect(company)}>{company}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Year Dropdown */}
                <div className="dropdown dropdown-hover">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn m-1 h-8"
                    >
                        {selectedYear}
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                        {availableYears.length > 0 &&
                            availableYears.map((year) => (
                                <li key={year}>
                                    <a onClick={() => handleYearSelect(year)}>{year}</a>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>

            {/* Table */}
            <div className="text-black overflow-x-auto w-full max-w-4xl px-4">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr className="text-black">
                            <th>S.No</th>
                            <th>Roll No</th>
                            <th>Candidate Name</th>
                            <th>Email</th>
                            <th>FT/Intern</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((row, index) => (
                                <tr key={row.id}>
                                    <td>{index + 1}</td>
                                    <td>{row.rollNo}</td>
                                    <td>{row.name}</td>
                                    <td>{row.email}</td>
                                    <td>{row.type}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Please select a company and then year to view the table.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
