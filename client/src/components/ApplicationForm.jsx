import { useState } from 'react';
import {
  X,
  BriefcaseBusiness,
  Link2,
  CalendarDays,
  FileText,
  Tag,
  Loader2,
} from 'lucide-react';
import api from '../services/api';

const ApplicationForm = ({
  onClose,
  onApplicationAdded,
  applicationToEdit,
}) => {
  const [formData, setFormData] = useState({
    company: applicationToEdit?.company || '',
    role: applicationToEdit?.role || '',
    status: applicationToEdit?.status || 'Applied',
    jobLink: applicationToEdit?.jobLink || '',
    notes: applicationToEdit?.notes || '',
    dateApplied: applicationToEdit?.dateApplied
      ? applicationToEdit.dateApplied.slice(0, 10)
      : '',
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.company.trim()) {
      return setError('Company name is required');
    }

    if (!formData.role.trim()) {
      return setError('Role is required');
    }

    if (formData.jobLink.trim()) {
      try {
        const url = new URL(formData.jobLink);

        if (!['http:', 'https:'].includes(url.protocol)) {
          return setError(
            'Job link must start with http:// or https://'
          );
        }
      } catch {
        return setError('Please enter a valid job link');
      }
    }

    const cleanedData = {
      ...formData,
      company: formData.company.trim(),
      role: formData.role.trim(),
      jobLink: formData.jobLink.trim(),
      notes: formData.notes.trim(),
    };

    setSubmitting(true);

    try {
      const response = applicationToEdit
        ? await api.patch(
            `/applications/${applicationToEdit._id}`,
            cleanedData
          )
        : await api.post('/applications', cleanedData);

      onApplicationAdded(response.data);
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.error || 'Something went wrong'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full h-12 rounded-xl border border-white/[0.08] bg-[#111217] px-4 text-[14px] text-zinc-100 outline-none transition-all placeholder:text-zinc-600 focus:border-indigo-500/60 focus:bg-[#14151c] focus:ring-4 focus:ring-indigo-500/10';

  const labelClass =
    'mb-2.5 block text-[13px] font-semibold tracking-wide text-zinc-300';

  const iconClass =
    'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500';

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl">

      <div className="relative w-full max-w-[820px] overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0d0e12] shadow-[0_30px_100px_rgba(0,0,0,0.65)]">

       
        <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-[70%] -translate-x-1/2 rounded-full bg-indigo-500/[0.07] blur-3xl" />

       
        <div className="relative border-b border-white/[0.07] px-6 py-6 sm:px-8">

          <div className="flex items-start justify-between">

            <div>
              <div className="mb-3 flex items-center gap-2.5">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-400/10 bg-indigo-500/10 text-indigo-400">
                  <BriefcaseBusiness
                    size={17}
                    strokeWidth={2}
                  />
                </div>

                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-400">
                  Career tracker
                </span>
              </div>

              <h2 className="text-[22px] font-bold tracking-tight text-white">
                {applicationToEdit
                  ? 'Edit application'
                  : 'Add application'}
              </h2>

              <p className="mt-1.5 text-[13px] text-zinc-500">
                Keep the details of your opportunity in one place.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-transparent text-zinc-500 transition-all hover:border-white/[0.07] hover:bg-white/[0.05] hover:text-zinc-200"
            >
              <X size={19} />
            </button>

          </div>
        </div>

       
        <form
          onSubmit={handleSubmit}
          className="relative max-h-[78vh] overflow-y-auto px-6 py-7 sm:px-8"
        >

          <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">

            
            <div>
              <label className={labelClass}>
                Company
              </label>

              <div className="relative">
                <BriefcaseBusiness
                  size={16}
                  className={iconClass}
                />

                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Google"
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

           
            <div>
              <label className={labelClass}>
                Role
              </label>

              <div className="relative">
                <Tag
                  size={16}
                  className={iconClass}
                />

                <input
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="e.g. Software Engineer Intern"
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Job link
              </label>

              <div className="relative">
                <Link2
                  size={16}
                  className={iconClass}
                />

                <input
                  name="jobLink"
                  value={formData.jobLink}
                  onChange={handleChange}
                  placeholder="https://..."
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Status
              </label>

              <div className="relative">
                <Tag
                  size={16}
                  className={iconClass}
                />

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={`${inputClass} cursor-pointer appearance-none pl-11 pr-10`}
                >
                  <option
                    value="Applied"
                    className="bg-[#111217] text-white"
                  >
                    Applied
                  </option>

                  <option
                    value="Interview"
                    className="bg-[#111217] text-white"
                  >
                    Interview
                  </option>

                  <option
                    value="Offer"
                    className="bg-[#111217] text-white"
                  >
                    Offer
                  </option>

                  <option
                    value="Rejected"
                    className="bg-[#111217] text-white"
                  >
                    Rejected
                  </option>
                </select>

                {/* custom arrow */}
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>

            
            <div>
              <label className={labelClass}>
                Date applied
              </label>

              <div className="relative">
                <CalendarDays
                  size={16}
                  className={iconClass}
                />

                <input
                  type="date"
                  name="dateApplied"
                  value={formData.dateApplied}
                  onChange={handleChange}
                  className={`${inputClass} pl-11 [color-scheme:dark]`}
                />
              </div>
            </div>

            
            <div className="sm:col-span-2">
              <label className={labelClass}>
                Notes
              </label>

              <div className="relative">
                <FileText
                  size={16}
                  className="pointer-events-none absolute left-4 top-4 text-zinc-500"
                />

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Interview notes, recruiter details, next steps..."
                  className={`${inputClass} min-h-[125px] resize-none pl-11 pt-3.5 leading-6`}
                />
              </div>

              <p className="mt-2 text-[11px] text-zinc-600">
                Add anything useful that you want to remember about
                this opportunity.
              </p>
            </div>

          </div>

          
          {error && (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/[0.08] px-4 py-3.5 text-[13px] text-rose-300">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-end">

            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="h-11 rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 text-[13px] font-semibold text-zinc-400 transition-all hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 text-[13px] font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-400 hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting && (
                <Loader2
                  size={16}
                  className="animate-spin"
                />
              )}

              {submitting
                ? 'Saving...'
                : applicationToEdit
                ? 'Save changes'
                : 'Add application'}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;