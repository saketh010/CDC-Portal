// components/QAField.js
import React from 'react';

const QAField = ({ label, value, onChange }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-bold mb-2">{label}</label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={`Enter ${label}`}
                className="input input-bordered w-full"
            />
        </div>
    );
};

export default QAField;
