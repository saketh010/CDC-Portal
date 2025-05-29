import connectToDatabase from '../../../lib/mongodb';
import Selection from '../../../models/Selection';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDatabase();
    
    const { company, year, type } = req.query;
    let query = {};
    
    if (company) query.companyName = company;
    if (year) query.year = parseInt(year);
    if (type) {
      query['selectedStudents.type'] = type;
    }
    
    const selections = await Selection.find(query);
    const allSelections = await Selection.find({});
    
    // Filter selectedStudents based on type if specified
    const filteredSelections = selections.map(selection => ({
      ...selection.toObject(),
      selectedStudents: type 
        ? selection.selectedStudents.filter(student => student.type === type)
        : selection.selectedStudents
    }));

    const uniqueCompanies = [...new Set(allSelections.map(s => s.companyName))];
    const uniqueYears = [...new Set(allSelections.map(s => s.year))];
    
    res.status(200).json({
      selections: filteredSelections,
      companies: uniqueCompanies,
      years: uniqueYears
    });
  } catch (error) {
    console.error('Error fetching selections:', error);
    res.status(500).json({ message: 'Failed to fetch selections' });
  }
}