import React, { useState } from 'react';
import Slider from './Slider';
import Modal from './Modal';
import Link from 'next/link';


function UserPreferences({ user }:any) {
  const [distance, setDistance] = useState(50);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preferencesChanged, setPreferencesChanged] = useState(false);

  const handleDistanceChange = (value:number) => {
    if (!user?.isPremium && value > 1000) {
      setIsModalOpen(true); // Open the modal if non-premium user exceeds 1000
    } else {
      setDistance(value);
      setPreferencesChanged(true); // Enable save button when preference is changed
    }
  };

  const handlePreferenceChange = () => {
    setPreferencesChanged(true);
  };

  const handleSavePreferences = () => {
    // Add logic to save preferences here
    setPreferencesChanged(false); // Disable button after saving
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-6">
      <h2 className="text-xl font-medium">User Preferences</h2>

      {/* Age Preference */}
      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">Age Preference</label>
        <input
          type="range"
          min="18"
          max="100"
          step="1"
          className="w-full"
          onChange={handlePreferenceChange}
        />
        <p className="text-xs text-gray-400">Adjust your preferred age range.</p>
      </div>

      {/* Distance Range */}
      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">Distance Range</label>
        <Slider
          min={0}
          max={10000}
          step={10}
          value={distance}
          onChange={handleDistanceChange}
        />
        <p className="text-xs text-gray-400">
          Set your search distance (up to {user?.isPremium ? "10,000" : "1,000"} km).
        </p>
      </div>

      {/* Location (Premium Only) */}
      {user?.isPremium && (
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Location</label>
          <input
            type="text"
            placeholder="Enter city or ZIP code"
            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-100"
            onChange={handlePreferenceChange}
          />
          <p className="text-xs text-gray-400">Set your preferred location.</p>
        </div>
      )}

      {/* Gender Preference */}
      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">Gender Preference</label>
        <select
          className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-100"
          onChange={handlePreferenceChange}
        >
          <option>All</option>
          <option>Male</option>
          <option>Female</option>
          <option>Non-binary</option>
        </select>
        <p className="text-xs text-gray-400">Select preferred genders to match with.</p>
      </div>

      {/* Profile Visibility */}
      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">Profile Visibility</label>
        <select
          className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-100"
          onChange={handlePreferenceChange}
        >
          <option>Public</option>
          <option>Private</option>
        </select>
        <p className="text-xs text-gray-400">Choose who can view your profile.</p>
      </div>

      {/* Notification Settings */}
      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">Notifications</label>
        <input type="checkbox" className="mr-2" onChange={handlePreferenceChange} />
        <span className="text-sm">Receive email notifications</span>
      </div>

      {/* Save Preferences Button */}
      <button
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
        disabled={!preferencesChanged}
        onClick={handleSavePreferences}
      >
        Save Preferences
      </button>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <p className="text-center text-gray-800">
            Upgrade to premium to set a distance range up to 10,000 km.
          </p>
          <Link
          href={'/dashboard/subscription'}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            Go to Subscription Page
          </Link>
        </Modal>
      )}
    </div>
  );
}

export default UserPreferences;
