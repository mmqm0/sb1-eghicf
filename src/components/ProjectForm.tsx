import React from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Calendar, Zap } from 'lucide-react';

interface ProjectFormData {
  projectName: string;
  location: string;
  installedCapacity: number;
  startDate: string;
}

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">
          Project Name
        </label>
        <input
          {...register('projectName', { required: 'Project name is required' })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="projectName"
          type="text"
          placeholder="XXXX Photovoltaic Power Generation Project"
        />
        {errors.projectName && <p className="text-red-500 text-xs italic">{errors.projectName.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
          <MapPin className="inline-block mr-1" size={16} />
          Location
        </label>
        <input
          {...register('location', { required: 'Location is required' })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="location"
          type="text"
          placeholder="City, State, Country"
        />
        {errors.location && <p className="text-red-500 text-xs italic">{errors.location.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="installedCapacity">
          <Zap className="inline-block mr-1" size={16} />
          Installed Capacity (MW)
        </label>
        <input
          {...register('installedCapacity', { required: 'Installed capacity is required', min: 0 })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="installedCapacity"
          type="number"
          step="0.1"
          placeholder="100"
        />
        {errors.installedCapacity && <p className="text-red-500 text-xs italic">{errors.installedCapacity.message}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
          <Calendar className="inline-block mr-1" size={16} />
          Project Start Date
        </label>
        <input
          {...register('startDate', { required: 'Start date is required' })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="startDate"
          type="date"
        />
        {errors.startDate && <p className="text-red-500 text-xs italic">{errors.startDate.message}</p>}
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Generate Report
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;