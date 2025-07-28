'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPackage } from '@/lib/api/admin';

type Spot = {
  location: string;
  timing: string;
};

type ReadyToPickupCity = {
  city: string;
  spots: Spot[];
};

export default function PackageForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    duration: '',
    price: '',
    details: '',
    description: '',
    category: '',
    status: 'active',
    rating: 0,
    location: '',
    reviewsCount: 0,
    mapEmbedUrl: '',
    bookingUrl: '',
    tags: [] as string[],
    itinerary: [] as string[],
    inclusions: [] as string[],
    exclusions: [] as string[],
    availability: { start: '', end: '' },
    readyToPickup: [] as ReadyToPickupCity[]
  });
  const [currentTag, setCurrentTag] = useState('');
  const [currentItinerary, setCurrentItinerary] = useState('');
  const [currentInclusion, setCurrentInclusion] = useState('');
  const [currentExclusion, setCurrentExclusion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [newCity, setNewCity] = useState('');
  const [currentCityIndex, setCurrentCityIndex] = useState<number | null>(null);
  const [newSpot, setNewSpot] = useState({
    location: '',
    timing: '',
  });

  const handleAddCity = () => {
    if (newCity.trim()) {
      setFormData(prev => ({
        ...prev,
        readyToPickup: [
          ...prev.readyToPickup,
          {
            city: newCity.trim(),
            spots: [],
          },
        ],
      }));
      setNewCity('');
    }
  };

  // Remove a city from readyToPickup
  const handleRemoveCity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      readyToPickup: prev.readyToPickup.filter((_, i) => i !== index),
    }));
  };

  // Set the current city for adding spots
  const handleSelectCity = (index: number) => {
    setCurrentCityIndex(index);
  };

  // Add a spot to the selected city
  const handleAddSpot = () => {
    if (
      currentCityIndex !== null &&
      newSpot.location.trim() &&
      newSpot.timing.trim()
    ) {
      const updatedReadyToPickup = [...formData.readyToPickup];
      updatedReadyToPickup[currentCityIndex].spots.push({
        location: newSpot.location.trim(),
        timing: newSpot.timing.trim(),
      });

      setFormData(prev => ({
        ...prev,
        readyToPickup: updatedReadyToPickup,
      }));

      setNewSpot({
        location: '',
        timing: '',
      });
    }
  };

  // Remove a spot from a city
  const handleRemoveSpot = (cityIndex: number, spotIndex: number) => {
    const updatedReadyToPickup = [...formData.readyToPickup];
    updatedReadyToPickup[cityIndex].spots = updatedReadyToPickup[
      cityIndex
    ].spots.filter((_, i) => i !== spotIndex);

    setFormData(prev => ({
      ...prev,
      readyToPickup: updatedReadyToPickup,
    }));
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayField = (field: 'tags' | 'itinerary' | 'inclusions' | 'exclusions', value: string, setCurrentValue: React.Dispatch<React.SetStateAction<string>>) => {
    if (value && !formData[field].includes(value)) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value]
      }));
      setCurrentValue('');
    }
  };

  const handleRemoveItem = (field: 'tags' | 'itinerary' | 'inclusions' | 'exclusions', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError('');

  // Validate required fields
  const requiredFields = ['image', 'title', 'duration', 'price', 'details', 'description'];
  for (const field of requiredFields) {
    if (!formData[field as keyof typeof formData]) {
      setError(`Missing required field: ${field}`);
      setIsSubmitting(false);
      return;
    }
  }

  try {
    await createPackage(formData);
    router.push('/admin/packages');
    router.refresh();
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to create package');
    console.error('Error creating package:', err);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Create New Travel Package</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Reviews Count</label>
              <input
                type="number"
                name="reviewsCount"
                value={formData.reviewsCount}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Description Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Details</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>

        {/* URLs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Map Embed URL</label>
            <input
              type="text"
              name="mapEmbedUrl"
              value={formData.mapEmbedUrl}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Booking URL</label>
            <input
              type="text"
              name="bookingUrl"
              value={formData.bookingUrl}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Array Fields */}
        <div className="space-y-6">
          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tags</label>
            <div className="mt-1 flex">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                className="flex-1 border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Add a tag"
              />
              <button
                type="button"
                onClick={() => handleArrayField('tags', currentTag, setCurrentTag)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('tags', index)}
                    className="ml-1.5 inline-flex text-indigo-400 hover:text-indigo-600 focus:outline-none"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Itinerary</label>
            <div className="mt-1 flex">
              <input
                type="text"
                value={currentItinerary}
                onChange={(e) => setCurrentItinerary(e.target.value)}
                className="flex-1 border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Add an itinerary item"
              />
              <button
                type="button"
                onClick={() => handleArrayField('itinerary', currentItinerary, setCurrentItinerary)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add
              </button>
            </div>
            <ul className="mt-2 space-y-1">
              {formData.itinerary.map((item, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded">
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('itinerary', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Inclusions */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Inclusions</label>
            <div className="mt-1 flex">
              <input
                type="text"
                value={currentInclusion}
                onChange={(e) => setCurrentInclusion(e.target.value)}
                className="flex-1 border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Add an inclusion"
              />
              <button
                type="button"
                onClick={() => handleArrayField('inclusions', currentInclusion, setCurrentInclusion)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add
              </button>
            </div>
            <ul className="mt-2 space-y-1">
              {formData.inclusions.map((item, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded">
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('inclusions', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Exclusions</label>
            <div className="mt-1 flex">
              <input
                type="text"
                value={currentExclusion}
                onChange={(e) => setCurrentExclusion(e.target.value)}
                className="flex-1 border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Add an exclusion"
              />
              <button
                type="button"
                onClick={() => handleArrayField('exclusions', currentExclusion, setCurrentExclusion)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add
              </button>
            </div>
            <ul className="mt-2 space-y-1">
              {formData.exclusions.map((item, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded">
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('exclusions', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Availability */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Availability</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                name="availability.start"
                value={formData.availability.start}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  availability: {
                    ...prev.availability,
                    start: e.target.value
                  }
                }))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                name="availability.end"
                value={formData.availability.end}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  availability: {
                    ...prev.availability,
                    end: e.target.value
                  }
                }))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Ready to Pickup Locations */}
        <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Ready to Pickup Locations</h3>
        
        {/* Add New City */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            placeholder="Add a city"
            className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="button"
            onClick={handleAddCity}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add City
          </button>
        </div>

        {/* Cities List */}
        <div className="space-y-4">
          {formData.readyToPickup.map((cityData, cityIndex) => (
            <div key={cityIndex} className="border rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">{cityData.city}</h4>
                <button
                  type="button"
                  onClick={() => handleRemoveCity(cityIndex)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove City
                </button>
              </div>

              {/* Add Spots to this City */}
              <div className="ml-4 space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={currentCityIndex === cityIndex ? newSpot.location : ''}
                    onChange={(e) => setNewSpot({ ...newSpot, location: e.target.value })}
                    placeholder="Location"
                    className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    onFocus={() => handleSelectCity(cityIndex)}
                  />
                  <input
                    type="text"
                    value={currentCityIndex === cityIndex ? newSpot.timing : ''}
                    onChange={(e) => setNewSpot({ ...newSpot, timing: e.target.value })}
                    placeholder="Timing"
                    className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    onFocus={() => handleSelectCity(cityIndex)}
                  />
                  <button
                    type="button"
                    onClick={handleAddSpot}
                    disabled={currentCityIndex !== cityIndex}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Spot
                  </button>
                </div>

                {/* Spots List */}
                <ul className="space-y-2">
                  {cityData.spots.map((spot, spotIndex) => (
                    <li key={spotIndex} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded">
                      <div>
                        <span className="font-medium">{spot.location}</span>
                        <span className="text-gray-500 ml-2">({spot.timing})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveSpot(cityIndex, spotIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push('/admin/packages')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating...' : 'Create Package'}
          </button>
        </div>
      </form>
    </div>
  );
}