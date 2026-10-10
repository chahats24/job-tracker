import { useState } from 'react';
import api from '../services/api';

const ApplicationForm = ({
  onClose,
  onApplicationAdded,
  applicationToEdit
}) => {

  const [formData, setFormData] = useState({
    company: applicationToEdit?.company || '',
    role: applicationToEdit?.role || '',
    status: applicationToEdit?.status || 'Applied',
    jobLink: applicationToEdit?.jobLink || '',
    notes: applicationToEdit?.notes || '',
    dateApplied: applicationToEdit?.dateApplied
      ? applicationToEdit.dateApplied.slice(0, 10)
      : ''
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.company.trim()) {
        setError('Company name is required');
        return;
    }

    if (!formData.role.trim()) {
        setError('Role is required');
        return;
    }
    if (formData.jobLink.trim()) {
    try {
        const url = new URL(formData.jobLink);

        if (!['http:', 'https:'].includes(url.protocol)) {
            setError('Job link must start with http:// or https://');
            return;
        }
    } catch {
        setError('Please enter a valid job link');
        return;
    }
}
const cleanedData = {
    ...formData,
    company: formData.company.trim(),
    role: formData.role.trim(),
    jobLink: formData.jobLink.trim(),
    notes: formData.notes.trim()
};

    setSubmitting(true);
    try {
      let response;

      if (applicationToEdit) {
    response = await api.patch(
        `/applications/${applicationToEdit._id}`,
        cleanedData
    );
} else {
    response = await api.post(
        '/applications',
        cleanedData
    );
}

      onApplicationAdded(response.data);
      onClose();

    } catch (err) {
      setError(
        err.response?.data?.error ||
        'Something went wrong'
      );
    }
    finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center">

      <div className="bg-white w-full max-w-2xl max-h-screen rounded-2xl p-8 flex flex-col gap-4 overflow-y-auto mx-4">

        <div className="flex items-center justify-between">

          <h2 className="text-lg font-semibold text-gray-800">
            {applicationToEdit
              ? 'Edit Application'
              : 'Add Application'}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>

        </div>


        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >

          {/* Company */}
          <div className="flex flex-col gap-1.5">

            <label className="text-sm font-medium text-gray-600">
              Company name
            </label>

            <input
              type="text"
              name="company"
              placeholder="e.g. Google"
              value={formData.company}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />

          </div>


          {/* Role */}
          <div className="flex flex-col gap-1.5">

            <label className="text-sm font-medium text-gray-600">
              Role
            </label>

            <input
              type="text"
              name="role"
              placeholder="e.g. SDE Intern"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />

          </div>


          {/* Status */}
          <div className="flex flex-col gap-1.5">

            <label className="text-sm font-medium text-gray-600">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="Applied">
                Applied
              </option>

              <option value="Interview">
                Interview
              </option>

              <option value="Offer">
                Offer
              </option>

              <option value="Rejected">
                Rejected
              </option>

            </select>

          </div>


          {/* Job Link */}
          <div className="flex flex-col gap-1.5">

            <label className="text-sm font-medium text-gray-600">
              Job link
            </label>

            <input
              type="text"
              name="jobLink"
              placeholder="https://..."
              value={formData.jobLink}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />

          </div>


          {/* Date Applied */}
          <div className="flex flex-col gap-1.5">

            <label className="text-sm font-medium text-gray-600">
              Date applied
            </label>

            <input
              type="date"
              name="dateApplied"
              value={formData.dateApplied}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />

          </div>


          {/* Notes */}
          <div className="flex flex-col gap-1.5">

            <label className="text-sm font-medium text-gray-600">
              Notes
            </label>

            <textarea
              name="notes"
              placeholder="Any notes about this application..."
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 resize-none"
            />

          </div>


          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}


          {/* Buttons */}
          <div className="flex gap-3 mt-2">

            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-blue-800 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-900"
            >
              {submitting
                ? 'Saving...'
                : applicationToEdit
                  ? 'Save Changes'
                  : 'Add Application'
              }
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ApplicationForm;