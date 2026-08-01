import {useState,useContext} from 'react';
import axios from 'axios';
import { AuthContext} from '../context/AuthContext';
const ApplicationForm=({onClose,onAdd})=>{
    const {token}=useContext(AuthContext);
    const [company,setCompany]=useState('');
    const [role,setRole]=useState('');
    const [status,setStatus]=useState('Applied');
    const [jobLink,setJobLink]=useState('');
    const [notes,setNotes]=useState('');
    const [dateApplied,setDateApplied]=useState(new Date().toISOString().split('T')[0]);
    const [error,setError]=useState(null);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.post('http://localhost:4000/api/applications',
                {company,role,status,jobLink,notes,dateApplied},
                {headers: {Authorization: `Bearer ${token}`}}
            );
            onAdd(response.data);
            onClose();
        }catch(err){
            setError(err.response.data.error);
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-20 flex justify-end">

      
      <div className="bg-white w-full max-w-md h-full p-6 flex flex-col gap-4 overflow-y-auto">

        
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Add Application</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Company */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-600">Company name</label>
            <input
              type="text"
              placeholder="e.g. Google"
              value={company}
              onChange={(e) => setCompany( e.target.value )}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Role */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-600">Role</label>
            <input
              type="text"
              placeholder="e.g. SDE Intern"
              value={role}
              onChange={(e) => setRole( e.target.value )}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-600">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus( e.target.value )}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Job Link */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-600">Job link</label>
            <input
              type="text"
              placeholder="https://..."
              value={jobLink}
              onChange={(e) => setJobLink( e.target.value )}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Date Applied */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-600">Date applied</label>
            <input
              type="date"
              value={dateApplied}
              onChange={(e) => setDateApplied( e.target.value )}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-600">Notes</label>
            <textarea
              placeholder="Any notes about this application..."
              value={notes}
              onChange={(e) => setNotes( e.target.value )}
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 resize-none"
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Buttons */}
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-800 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-900"
            >
              Add Application
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
   