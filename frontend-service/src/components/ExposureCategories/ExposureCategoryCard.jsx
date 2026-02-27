import React from 'react'
import { Link } from 'react-router-dom'

const ExposureCategoryCard = ({ category }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-2">{category.categoryName}</h3>
      <p className="text-gray-700 mb-1">
        Weight: <span className="font-semibold">{category.exposureCategoryWeight ?? 'N/A'}</span>
      </p>
      <p className="text-gray-500 text-sm mb-2">
        Created: {category.createdAt ? new Date(category.createdAt).toLocaleDateString() : 'N/A'}
      </p>
      <div className="mb-2">
        <h4 className="font-semibold text-indigo-800">Risks:</h4>
        {category.riskNames && category.riskNames.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 text-sm">
            {category.riskNames.map((riskName, idx) => (
              <li key={idx}>{riskName}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-sm">No risks assigned.</p>
        )}
      </div>
    </div>
  )
}

export default ExposureCategoryCard