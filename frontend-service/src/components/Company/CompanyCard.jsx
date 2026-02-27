import React from 'react'

const CompanyCard = ({ company, users = [] }) => {
  if (!company) return null

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 className="text-2xl font-bold text-indigo-600 mb-4">
        {company.companyName || 'Unnamed Company'}
      </h3>

      <p className="text-gray-700 mb-2">
        Industry ID: <span className="font-semibold">{company.companyIndustryId ?? 'N/A'}</span>
      </p>
      <p className="text-gray-700 mb-2">
        Website: <a href={company.companyWebsiteUrl} target="_blank" rel="noreferrer" className="underline text-indigo-500">
          {company.companyWebsiteUrl ?? 'N/A'}
        </a>
      </p>
      <p className="text-gray-700 mb-4">
        Country: <span className="font-semibold">{company.country ?? 'N/A'}</span>
      </p>

      <h4 className="text-xl font-semibold text-indigo-500 mb-3">
        Company Users ({users.length})
      </h4>

      {users.length === 0 ? (
        <p className="text-gray-500 text-sm">No users found.</p>
      ) : (
        <ul className="list-disc list-inside text-gray-700">
          {users.map((user) => (
            <li key={user._id} className="mb-1">
              {user.name} {user.lastName} - {user.phoneNumber} - <span className="font-semibold">{user.userType}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CompanyCard