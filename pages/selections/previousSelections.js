import { useState, useEffect } from 'react';

export default function PreviousSelectionsPage() {
  const [selections, setSelections] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);

  const employmentTypes = ['FT', 'Intern'];

  useEffect(() => {
    fetchSelections();
  }, [selectedCompany, selectedYear, selectedType]);

  const fetchSelections = async () => {
    try {
      setLoading(true);
      let url = '/api/selections/getSelections';
      if (selectedCompany || selectedYear || selectedType) {
        url += '?';
        if (selectedCompany) url += `company=${selectedCompany}&`;
        if (selectedYear) url += `year=${selectedYear}&`;
        if (selectedType) url += `type=${selectedType}`;
      }
      
      const res = await fetch(url);
      const data = await res.json();
      
      if (res.ok) {
        setSelections(data.selections);
        if (!companies.length) setCompanies(data.companies);
        if (!years.length) setYears(data.years);
      }
    } catch (error) {
      console.error('Failed to fetch selections:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl flex justify-center text-black font-bold mb-8">Previous Selections</h1>
      
      <div className="flex justify-center gap-4 mb-6">
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="select text-white select-bordered w-48"
        >
          <option value="">All Companies</option>
          {companies.map(company => (
            <option key={company} value={company}>{company}</option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="select text-white select-bordered w-48"
        >
          <option value="">All Years</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="select text-white select-bordered w-48"
        >
          <option value="">All Types</option>
          {employmentTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className='text-black text-xl font-extrabold'>
            <tr>
              <th>S.No</th>
              <th>Roll No</th>
              <th>Candidate Name</th>
              <th>Email</th>
              <th>FT/Intern</th>
            </tr>
          </thead>
          <tbody className='text-black font-semibold'>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center">Loading...</td>
              </tr>
            ) : selections.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No selections found</td>
              </tr>
            ) : (
              selections.map((selection) => 
                selection.selectedStudents.map((student, index) => (
                  <tr key={`${selection._id}-${student.rollNo}`}>
                    <td>{index + 1}</td>
                    <td>{student.rollNo}</td>
                    <td>{student.candidateName}</td>
                    <td>{student.email}</td>
                    <td>{student.type}</td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}