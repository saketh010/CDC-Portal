import connectToDatabase from '../../../lib/mongodb';
import Selection from '../../../models/Selection';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDatabase();
    const selectionData = req.body;

    // Validate required fields
    if (!selectionData.companyName || !selectionData.year || !selectionData.selectedStudents) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newSelection = await Selection.create(selectionData);
    res.status(201).json({ message: 'Selection added successfully', data: newSelection });
  } catch (error) {
    console.error('Error adding selection:', error);
    res.status(500).json({ message: 'Failed to add selection', error: error.message });
  }
}