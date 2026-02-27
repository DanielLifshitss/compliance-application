import { useState } from 'react';
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditRiskPage = ({ updateRiskSubmit, exposureCategories }) => {
  const risk = useLoaderData()
  const [riskName, setRiskName] = useState(risk.riskName || '');
  const [exposureCategoryId, setExposureCategoryId] = useState(risk.exposureCategoryId || '');
  const [exposureRiskWeight, setExposureRiskWeight] = useState(risk.exposureRiskWeight || 1);
  const [tasks, setTasks] = useState(risk.tasks || []);

  const navigate = useNavigate();
  const { riskId } = useParams();

  const submitForm = (e) => {
    e.preventDefault();

    const updatedRisk = {
      id: riskId,
      riskName,
      exposureCategoryId,
      exposureRiskWeight,
      tasks
    };

    updateRiskSubmit(updatedRisk);

    toast.success('Risk Updated Successfully');
    navigate(`/risks/${riskId}`);
  };

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={submitForm}>
            <h2 className='text-3xl text-center font-semibold mb-6'>
              Update Risk
            </h2>

            <div className='mb-4'>
              <label htmlFor='riskName' className='block text-gray-700 font-bold mb-2'>
                Risk Name
              </label>
              <input
                type='text'
                id='riskName'
                name='riskName'
                className='border rounded w-full py-2 px-3'
                placeholder='Enter risk name'
                required
                value={riskName}
                onChange={(e) => setRiskName(e.target.value)}
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='exposureCategory' className='block text-gray-700 font-bold mb-2'>
                Exposure Category
              </label>
              <select
                id='exposureCategory'
                name='exposureCategory'
                className='border rounded w-full py-2 px-3'
                required
                value={exposureCategoryId}
                onChange={(e) => setExposureCategoryId(e.target.value)}
              >
                <option value=''>Select Category</option>
                {exposureCategories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-4'>
              <label htmlFor='exposureRiskWeight' className='block text-gray-700 font-bold mb-2'>
                Risk Weight
              </label>
              <input
                type='number'
                id='exposureRiskWeight'
                name='exposureRiskWeight'
                className='border rounded w-full py-2 px-3'
                min='1'
                max='10'
                value={exposureRiskWeight}
                onChange={(e) => setExposureRiskWeight(Number(e.target.value))}
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='tasks' className='block text-gray-700 font-bold mb-2'>
                Tasks (optional, comma-separated IDs)
              </label>
              <input
                type='text'
                id='tasks'
                name='tasks'
                className='border rounded w-full py-2 px-3'
                placeholder='taskId1, taskId2, taskId3'
                value={tasks.join(', ')}
                onChange={(e) =>
                  setTasks(
                    e.target.value
                      .split(',')
                      .map((id) => id.trim())
                      .filter(Boolean)
                  )
                }
              />
            </div>

            <div>
              <button
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Update Risk
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditRiskPage;