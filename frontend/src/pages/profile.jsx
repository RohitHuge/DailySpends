// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faHome, faUsers, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { backendUrl } from '../config';
import authService from '../appwrite/auth';

const App = () => {
  // State for family members
  const [isLoading, setIsLoading] = useState(true);
  const [familyMembers, setFamilyMembers] = useState([
    {
      id: 1,
      name: 'William Thompson',
      role: 'Admin',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20a%2035%20year%20old%20caucasian%20man%20with%20short%20brown%20hair%20and%20blue%20eyes%2C%20smiling%20at%20camera%2C%20high%20quality%20photorealistic%20image%2C%20soft%20studio%20lighting%2C%20clean%20background%2C%20professional%20photography&width=100&height=100&seq=1&orientation=squarish',
      spending: { cash: 1250, debit: 2340 },
      lastActive: '2 hours ago',
      permissions: ['view', 'add', 'edit', 'delete']
    },
    {
      id: 2,
      name: 'Emma Johnson',
      role: 'Member',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20a%2030%20year%20old%20caucasian%20woman%20with%20blonde%20hair%20and%20green%20eyes%2C%20smiling%20at%20camera%2C%20high%20quality%20photorealistic%20image%2C%20soft%20studio%20lighting%2C%20clean%20background%2C%20professional%20photography&width=100&height=100&seq=2&orientation=squarish',
      spending: { cash: 850, debit: 1120 },
      lastActive: '1 day ago',
      permissions: ['view', 'add']
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      role: 'Member',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20a%2028%20year%20old%20hispanic%20man%20with%20dark%20hair%20and%20brown%20eyes%2C%20smiling%20at%20camera%2C%20high%20quality%20photorealistic%20image%2C%20soft%20studio%20lighting%2C%20clean%20background%2C%20professional%20photography&width=100&height=100&seq=3&orientation=squarish',
      spending: { cash: 620, debit: 980 },
      lastActive: '3 days ago',
      permissions: ['view']
    },
    {
      id: 4,
      name: 'Sophia Chen',
      role: 'Member',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20a%2025%20year%20old%20asian%20woman%20with%20long%20black%20hair%20and%20brown%20eyes%2C%20smiling%20at%20camera%2C%20high%20quality%20photorealistic%20image%2C%20soft%20studio%20lighting%2C%20clean%20background%2C%20professional%20photography&width=100&height=100&seq=4&orientation=squarish',
      spending: { cash: 430, debit: 1560 },
      lastActive: '5 hours ago',
      permissions: ['view', 'add']
    }
  ]);

  // State for user profile
  const [userProfile, setUserProfile] = useState({
    name: 'William Thompson',
    phone: '+1 (555) 123-4567',
    email: 'william.thompson@example.com',
    avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20a%2035%20year%20old%20caucasian%20man%20with%20short%20brown%20hair%20and%20blue%20eyes%2C%20smiling%20at%20camera%2C%20high%20quality%20photorealistic%20image%2C%20soft%20studio%20lighting%2C%20clean%20background%2C%20professional%20photography&width=100&height=100&seq=5&orientation=squarish',
    credits: 25,
    role: 'Admin'
  });

  // State for diary log dates
  const [diaryLogDates, setDiaryLogDates] = useState({
    cashDiary: '2025-06-05',
    debitDiary: '2025-06-07'
  });

  // State for member management
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [isEditingMember, setIsEditingMember] = useState(null);
  const [newMember, setNewMember] = useState({
    name: '',
    role: 'Member',
    permissions: ['view']
  });

  // State for permission management
  const [showPermissions, setShowPermissions] = useState(null);
  const navigate = useNavigate();

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle save diary log dates
  const handleSaveDiaryDates = async () => {
    // Here you would typically make an API call to save the dates
    console.log("Diary log dates", diaryLogDates);
    const res = await fetch(`${backendUrl}/updateSummaryDates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cashDiary: diaryLogDates.cashDiary,
        debitDiary: diaryLogDates.debitDiary,
        family_id: '11111111-1111-1111-1111-111111111111'
      })
    });
    console.log("Diary log dates saved successfully!");
  };

  // Handle add new member
  const handleAddMember = () => {
    if (newMember.name.trim() === '') {
      alert('Please enter a name for the new member');
      return;
    }
    
    const newMemberId = Math.max(...familyMembers.map(m => m.id)) + 1;
    const memberToAdd = {
      id: newMemberId,
      name: newMember.name,
      role: newMember.role,
      avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20a%20person%20with%20neutral%20expression%2C%20high%20quality%20photorealistic%20image%2C%20soft%20studio%20lighting%2C%20clean%20background%2C%20professional%20photography%2C%20centered%20composition&width=100&height=100&seq=6&orientation=squarish',
      spending: { cash: 0, debit: 0 },
      lastActive: 'Just now',
      permissions: newMember.permissions
    };
    
    setFamilyMembers([...familyMembers, memberToAdd]);
    setNewMember({
      name: '',
      role: 'Member',
      permissions: ['view']
    });
    setIsAddingMember(false);
  };

  // Handle edit member
  const handleUpdateMember = (id) => {
    const updatedMembers = familyMembers.map(member => {
      if (member.id === id) {
        return {
          ...member,
          name: newMember.name || member.name,
          role: newMember.role || member.role,
          permissions: newMember.permissions || member.permissions
        };
      }
      return member;
    });
    
    setFamilyMembers(updatedMembers);
    setIsEditingMember(null);
    setNewMember({
      name: '',
      role: 'Member',
      permissions: ['view']
    });
  };

  // Handle delete member
  const handleDeleteMember = (id) => {
    if (window.confirm('Are you sure you want to remove this family member?')) {
      const updatedMembers = familyMembers.filter(member => member.id !== id);
      setFamilyMembers(updatedMembers);
    }
  };

  const handleBack = () => {
    navigate('/home');
  };

  // Toggle permission for a member
  const togglePermission = (permission) => {
    if (newMember.permissions.includes(permission)) {
      setNewMember({
        ...newMember,
        permissions: newMember.permissions.filter(p => p !== permission)
      });
    } else {
      setNewMember({
        ...newMember,
        permissions: [...newMember.permissions, permission]
      });
    }
  };

  // Start editing a member
  const startEditMember = (member) => {
    setIsEditingMember(member.id);
    setNewMember({
      name: member.name,
      role: member.role,
      permissions: [...member.permissions]
    });
  };

useEffect(() => {
  const user = authService.getCurrentUser();
  if (user) {
    console.log("user", user);
    setUserProfile({
      name: user.name,
      phone: user.phone,
      email: user.email,
    }
  );
  }
}, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-700 text-lg">Loading family data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 max-w-[375px] mx-auto relative">
      {/* Header */}
      <div className="bg-white shadow-sm z-10 sticky top-0 px-4 py-3 border-b">
        <div className="flex justify-between items-center">
             <i onClick ={handleBack} className="fas fa-arrow-left"></i>
             <h1 className="text-lg font-semibold text-gray-800">Family Management</h1>
          <div className="w-6"></div> {/* Placeholder for balance */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20 px-4 pt-4">
        {/* User Profile Card */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="flex items-center">
            <div className="relative">
              <img 
                src={userProfile.avatar} 
                alt={userProfile.name} 
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
              />
              {/* <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {userProfile.credits}
              </div> */}
            </div>
            <div className="ml-4 flex-1">
              <h2 className="font-semibold text-lg text-gray-800">{userProfile.name}</h2>
              <div className="flex items-center text-gray-600 text-sm mt-1">
                <i className="fas fa-phone-alt text-blue-500 mr-2"></i>
                <span>{userProfile.phone}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                  {userProfile.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Family Members Section */}
        {/* <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-semibold text-gray-800">Family Members</h2>
            <button 
              onClick={() => setIsAddingMember(true)}
              className="bg-blue-500 text-white text-sm px-3 py-1 rounded-lg cursor-pointer !rounded-button"
            >
              <i className="fas fa-plus mr-1"></i> Add
            </button>
          </div>
          
          <div className="divide-y divide-gray-100 max-h-[300px] overflow-y-auto">
            {familyMembers.map(member => (
              <div key={member.id} className="p-4">
                {isEditingMember === member.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={newMember.name}
                      onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                      placeholder="Member name"
                    />
                    <div className="flex space-x-2">
                      <select
                        value={newMember.role}
                        onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Member">Member</option>
                      </select>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Permissions:</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {['view', 'add', 'edit', 'delete'].map(perm => (
                          <div key={perm} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`perm-${perm}`}
                              checked={newMember.permissions.includes(perm)}
                              onChange={() => togglePermission(perm)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`perm-${perm}`} className="ml-2 text-sm text-gray-700 capitalize">
                              {perm}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => handleUpdateMember(member.id)}
                        className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer !rounded-button"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditingMember(null)}
                        className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors cursor-pointer !rounded-button"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center">
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-800">{member.name}</h3>
                            <div className="flex items-center text-xs text-gray-500">
                              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full mr-2">
                                {member.role}
                              </span>
                              <span>Active {member.lastActive}</span>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <button 
                              onClick={() => startEditMember(member)}
                              className="text-gray-500 hover:text-blue-500 cursor-pointer p-1"
                            >
                              <i className="fas fa-pencil-alt"></i>
                            </button>
                            <button 
                              onClick={() => handleDeleteMember(member.id)}
                              className="text-gray-500 hover:text-red-500 cursor-pointer p-1"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="bg-blue-50 rounded-lg p-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">💵 Cash</span>
                          <span className="font-medium text-blue-600">₹{member.spending.cash}</span>
                        </div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">💳 Debit</span>
                          <span className="font-medium text-green-600">₹{member.spending.debit}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <button
                        onClick={() => setShowPermissions(showPermissions === member.id ? null : member.id)}
                        className="text-xs text-blue-500 flex items-center cursor-pointer"
                      >
                        <span>Permissions</span>
                        <i className={`fas fa-chevron-${showPermissions === member.id ? 'up' : 'down'} ml-1`}></i>
                      </button>
                      
                      {showPermissions === member.id && (
                        <div className="mt-2 bg-gray-50 p-2 rounded-lg">
                          <div className="flex flex-wrap gap-1">
                            {member.permissions.map(perm => (
                              <span 
                                key={perm} 
                                className="text-xs bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full capitalize"
                              >
                                {perm}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div> */}

        {/* Add New Member Form */}
        {isAddingMember && (
          <div className="bg-white rounded-xl shadow-sm mb-4 p-4">
            <h2 className="font-semibold text-gray-800 mb-3">Add New Family Member</h2>
            <div className="space-y-3">
              <input
                type="text"
                value={newMember.name}
                onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                placeholder="Member name"
              />
              <div className="flex space-x-2">
                <select
                  value={newMember.role}
                  onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                >
                  <option value="Admin">Admin</option>
                  <option value="Member">Member</option>
                </select>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Permissions:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['view', 'add', 'edit', 'delete'].map(perm => (
                    <div key={perm} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`new-perm-${perm}`}
                        checked={newMember.permissions.includes(perm)}
                        onChange={() => togglePermission(perm)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`new-perm-${perm}`} className="ml-2 text-sm text-gray-700 capitalize">
                        {perm}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={handleAddMember}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer !rounded-button"
                >
                  Add Member
                </button>
                <button
                  onClick={() => setIsAddingMember(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors cursor-pointer !rounded-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Diary Log Dates Section */}
        <div className="bg-white rounded-xl shadow-sm mb-4">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-gray-800">Diary Log Dates</h2>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Cash Diary Log Date
              </label>
              <input
                type="date"
                value={diaryLogDates.cashDiary}
                onChange={(e) => setDiaryLogDates({...diaryLogDates, cashDiary: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Debit Card Diary Log Date
              </label>
              <input
                type="date"
                value={diaryLogDates.debitDiary}
                onChange={(e) => setDiaryLogDates({...diaryLogDates, debitDiary: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              />
            </div>
            <button
              onClick={handleSaveDiaryDates}
              className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer !rounded-button"
            >
              <i className="fas fa-save mr-2"></i> Save Dates
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-[375px] mx-auto">
        <div className="grid grid-cols-3 h-16">
            <button onClick = {handleBack} className="flex flex-col items-center justify-center text-blue-600 cursor-pointer">
            <i className="fas fa-home text-lg"></i>
            <span className="text-xs mt-1">Home</span>
          </button>
            <button  className="flex flex-col items-center justify-center text-blue-600 cursor-pointer">
            <i className="fas fa-users text-lg"></i>
            <span className="text-xs mt-1">Family</span>
          </button>
          <button className="flex flex-col items-center justify-center text-gray-400 opacity-60 cursor-not-allowed">
            <i className="fas fa-chart-bar text-lg"></i>
            <span className="text-xs mt-1">Analytics</span>
            <span className="text-[10px] text-gray-400">Coming Soon</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
