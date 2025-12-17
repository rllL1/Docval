'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ModalState {
  type: 'division' | 'doctype' | 'classification' | 'accounts' | null;
}

export default function UtilitiesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedSection, setSelectedSection] = useState<'division' | 'doctype' | 'classification' | 'accounts' | null>(null);
  const [modal, setModal] = useState<ModalState>({ type: null });
  const [showAddDivisionAside, setShowAddDivisionAside] = useState(false);
  const [divisionName, setDivisionName] = useState('');
  const [divisionAbvr, setDivisionAbvr] = useState('');
  const [showAddDocTypeAside, setShowAddDocTypeAside] = useState(false);
  const [docTypeName, setDocTypeName] = useState('');
  const [documentTypes, setDocumentTypes] = useState(['Form', 'Report', 'Memo', 'Policy', 'Contract', 'Invoice', 'Receipt', 'Proposal', 'Agreement', 'Manual', 'Guideline', 'Procedure']);
  const [showAddClassificationAside, setShowAddClassificationAside] = useState(false);
  const [classificationName, setClassificationName] = useState('');
  const [documentClassifications, setDocumentClassifications] = useState([
    { name: 'Confidential', color: 'bg-red-100 text-red-700' },
    { name: 'Internal', color: 'bg-yellow-100 text-yellow-700' },
    { name: 'Public', color: 'bg-green-100 text-green-700' },
    { name: 'Restricted', color: 'bg-purple-100 text-purple-700' },
  ]);
  const [showAddAccountAside, setShowAddAccountAside] = useState(false);
  const [accountData, setAccountData] = useState({ name: '', email: '', role: 'User', password: '', division: '' });
  const [userAccounts, setUserAccounts] = useState([
    { name: 'John Doe', email: 'john@dict.gov.ph', role: 'Admin', division: 'IT' },
    { name: 'Jane Smith', email: 'jane@dict.gov.ph', role: 'User', division: 'HR' },
    { name: 'Mike Johnson', email: 'mike@dict.gov.ph', role: 'User', division: 'Finance' },
    { name: 'Sarah Lee', email: 'sarah@dict.gov.ph', role: 'Moderator', division: 'Operations' },
    { name: 'Tom Brown', email: 'tom@dict.gov.ph', role: 'User', division: 'Legal' },
    { name: 'Lisa Wong', email: 'lisa@dict.gov.ph', role: 'User', division: 'IT' },
    { name: 'Mark Davis', email: 'mark@dict.gov.ph', role: 'Admin', division: 'Finance' },
    { name: 'Emma Wilson', email: 'emma@dict.gov.ph', role: 'User', division: 'HR' },
  ]);

  // Save document types to localStorage
  useEffect(() => {
    localStorage.setItem('documentTypes', JSON.stringify(documentTypes));
  }, [documentTypes]);

  // Save document classifications to localStorage
  useEffect(() => {
    localStorage.setItem('documentClassifications', JSON.stringify(documentClassifications));
  }, [documentClassifications]);

  // Save user accounts to localStorage
  useEffect(() => {
    localStorage.setItem('userAccounts', JSON.stringify(userAccounts));
  }, [userAccounts]);

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 16l-7-4m0 0l-2-3m2 3v10a1 1 0 001 1h12a1 1 0 001-1v-10m-9-4l7-4" /></svg>
    },
    { 
      id: 'files', 
      label: 'Files', 
      icon: <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    },
    { 
      id: 'utilities', 
      label: 'Utilities', 
      icon: <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
    },
  ];

  const utilities = [
    {
      id: 'division',
      title: 'Division',
      description: 'Manage organizational divisions',
      icon: '🏢',
      color: 'from-blue-500 to-blue-600',
      count: 5,
    },
    {
      id: 'doctype',
      title: 'Document Type',
      description: 'Define document types',
      icon: '📄',
      color: 'from-green-500 to-green-600',
      count: 12,
    },
    {
      id: 'classification',
      title: 'Document Classification',
      description: 'Set classification levels',
      icon: '🏷️',
      color: 'from-purple-500 to-purple-600',
      count: 4,
    },
    {
      id: 'accounts',
      title: 'Accounts',
      description: 'Manage user accounts',
      icon: '👥',
      color: 'from-orange-500 to-orange-600',
      count: 8,
    },
  ];

  const renderModalContent = () => {
    switch (modal.type) {
      case 'division':
        return (
          <div>
            <div className="mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-300">
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {['Finance', 'IT', 'HR', 'Operations', 'Legal'].map((item, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 text-gray-700">{item}</td>
                      <td className="px-4 py-3 flex gap-2">
                        <button className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm font-medium transition">Edit</button>
                        <button className="px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm font-medium transition">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition">
              + New Entry
            </button>
          </div>
        );
      case 'doctype':
        return (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Manage Document Types</h3>
            <div className="space-y-3 mb-6">
              {['Form', 'Report', 'Memo', 'Policy', 'Contract', 'Invoice', 'Receipt', 'Proposal', 'Agreement', 'Manual', 'Guideline', 'Procedure'].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-gray-700">{item}</span>
                  <button className="text-red-600 hover:bg-red-50 px-2 py-1 rounded text-sm">Delete</button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" placeholder="New document type" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Add</button>
            </div>
          </div>
        );
      case 'classification':
        return (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Manage Classifications</h3>
            <div className="space-y-3 mb-6">
              {[
                { name: 'Confidential', color: 'bg-red-100 text-red-700' },
                { name: 'Internal', color: 'bg-yellow-100 text-yellow-700' },
                { name: 'Public', color: 'bg-green-100 text-green-700' },
                { name: 'Restricted', color: 'bg-purple-100 text-purple-700' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className={`px-3 py-1 rounded text-sm font-medium ${item.color}`}>{item.name}</span>
                  <button className="text-red-600 hover:bg-red-50 px-2 py-1 rounded text-sm">Delete</button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" placeholder="New classification" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Add</button>
            </div>
          </div>
        );
      case 'accounts':
        return (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Manage User Accounts</h3>
            <div className="space-y-3 mb-6 max-h-80 overflow-y-auto">
              {[
                { name: 'John Doe', email: 'john@dict.gov.ph', role: 'Admin' },
                { name: 'Jane Smith', email: 'jane@dict.gov.ph', role: 'User' },
                { name: 'Mike Johnson', email: 'mike@dict.gov.ph', role: 'User' },
                { name: 'Sarah Lee', email: 'sarah@dict.gov.ph', role: 'Moderator' },
                { name: 'Tom Brown', email: 'tom@dict.gov.ph', role: 'User' },
                { name: 'Lisa Wong', email: 'lisa@dict.gov.ph', role: 'User' },
                { name: 'Mark Davis', email: 'mark@dict.gov.ph', role: 'Admin' },
                { name: 'Emma Wilson', email: 'emma@dict.gov.ph', role: 'User' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <p className="text-gray-900 font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">{item.role}</span>
                    <button className="text-red-600 hover:bg-red-50 px-2 py-1 rounded text-sm">Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">+ Add New Account</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Right Aside Panel for Add User Account */}
      {showAddAccountAside && (
        <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-lg z-50 flex flex-col">
          {/* Aside Header */}
          <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center flex-shrink-0 border-b-4 border-blue-700">
            <h2 className="text-2xl font-bold">Add User Account</h2>
            <button
              onClick={() => {
                setShowAddAccountAside(false);
                setAccountData({ name: '', email: '', role: 'User', password: '', division: '' });
              }}
              className="p-1 hover:bg-blue-800 rounded-lg transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Aside Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={accountData.name}
                    onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
                    placeholder="Enter full name" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    value={accountData.email}
                    onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                    placeholder="Enter email address" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <input 
                    type="password" 
                    value={accountData.password}
                    onChange={(e) => setAccountData({ ...accountData, password: e.target.value })}
                    placeholder="Enter password" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Division</label>
                  <input 
                    type="text" 
                    value={accountData.division}
                    onChange={(e) => setAccountData({ ...accountData, division: e.target.value })}
                    placeholder="Enter or select division" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                  <input 
                    type="text"
                    value={accountData.role}
                    onChange={(e) => setAccountData({ ...accountData, role: e.target.value })}
                    placeholder="e.g., Admin, User, Moderator" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Preview Table */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Preview</h3>
                <div className="border border-gray-200 rounded-lg overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">Name</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">Email</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">Division</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-blue-50 border-b border-gray-200">
                        <td className="px-4 py-2 text-xs text-gray-700">{accountData.name || '---'}</td>
                        <td className="px-4 py-2 text-xs text-gray-700">{accountData.email || '---'}</td>
                        <td className="px-4 py-2 text-xs text-gray-700">{accountData.division || '---'}</td>
                        <td className="px-4 py-2 text-xs"><span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">{accountData.role || '---'}</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Aside Footer */}
          <div className="border-t border-gray-200 p-4 flex gap-2 flex-shrink-0">
            <button
              onClick={() => {
                setShowAddAccountAside(false);
                setAccountData({ name: '', email: '', role: 'User', password: '', division: '' });
              }}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (accountData.name.trim() && accountData.email.trim()) {
                  setUserAccounts([...userAccounts, accountData]);
                  setShowAddAccountAside(false);
                  setAccountData({ name: '', email: '', role: 'User', password: '', division: '' });
                }
              }}
              className="flex-1 px-4 py-2 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 transition"
            >
              Save
            </button>
          </div>
        </div>
      )}
      {/* Right Aside Panel for Add Classification */}
      {showAddClassificationAside && (
        <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-lg z-50 flex flex-col">
          {/* Aside Header */}
          <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center flex-shrink-0 border-b-4 border-blue-700">
            <h2 className="text-2xl font-bold">Add Classification</h2>
            <button
              onClick={() => {
                setShowAddClassificationAside(false);
                setClassificationName('');
              }}
              className="p-1 hover:bg-blue-800 rounded-lg transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Aside Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Classification Name</label>
                  <input 
                    type="text" 
                    value={classificationName}
                    onChange={(e) => setClassificationName(e.target.value)}
                    placeholder="Enter classification name" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Preview Table */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Preview</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">Classification</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-blue-50 border-b border-gray-200">
                        <td className="px-4 py-2 text-xs text-gray-700">{classificationName || '---'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Aside Footer */}
          <div className="border-t border-gray-200 p-4 flex gap-2 flex-shrink-0">
            <button
              onClick={() => {
                setShowAddClassificationAside(false);
                setClassificationName('');
              }}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (classificationName.trim()) {
                  setDocumentClassifications([...documentClassifications, { name: classificationName.trim(), color: 'bg-blue-100 text-blue-700' }]);
                  setShowAddClassificationAside(false);
                  setClassificationName('');
                }
              }}
              className="flex-1 px-4 py-2 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 transition"
            >
              Save
            </button>
          </div>
        </div>
      )}
      {/* Right Aside Panel for Add Document Type */}
      {showAddDocTypeAside && (
        <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-lg z-50 flex flex-col">
          {/* Aside Header */}
          <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center flex-shrink-0 border-b-4 border-blue-700">
            <h2 className="text-2xl font-bold">Add Document Type</h2>
            <button
              onClick={() => {
                setShowAddDocTypeAside(false);
                setDocTypeName('');
              }}
              className="p-1 hover:bg-blue-800 rounded-lg transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Aside Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Document Type Name</label>
                  <input 
                    type="text" 
                    value={docTypeName}
                    onChange={(e) => setDocTypeName(e.target.value)}
                    placeholder="Enter document type" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Preview Table */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Preview</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-blue-50 border-b border-gray-200">
                        <td className="px-4 py-2 text-xs text-gray-700">{docTypeName || '---'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Aside Footer */}
          <div className="border-t border-gray-200 p-4 flex gap-2 flex-shrink-0">
            <button
              onClick={() => {
                setShowAddDocTypeAside(false);
                setDocTypeName('');
              }}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (docTypeName.trim()) {
                  setDocumentTypes([...documentTypes, docTypeName.trim()]);
                  setShowAddDocTypeAside(false);
                  setDocTypeName('');
                }
              }}
              className="flex-1 px-4 py-2 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 transition"
            >
              Save
            </button>
          </div>
        </div>
      )}
      {/* Right Aside Panel for Add Division */}
      {showAddDivisionAside && (
        <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-lg z-50 flex flex-col">
          {/* Aside Header */}
          <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center flex-shrink-0 border-b-4 border-blue-700">
            <h2 className="text-2xl font-bold">Add a New Division</h2>
            <button
              onClick={() => {
                setShowAddDivisionAside(false);
                setDivisionName('');
                setDivisionAbvr('');
              }}
              className="p-1 hover:bg-blue-800 rounded-lg transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Aside Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ID</label>
                  <input 
                    type="text" 
                    value={`DIV-${Math.random().toString(36).substr(2, 9).toUpperCase()}`}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">System generated</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                  <input 
                    type="text" 
                    value={divisionName}
                    onChange={(e) => setDivisionName(e.target.value)}
                    placeholder="Name of the division" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Abbreviated Name</label>
                  <input 
                    type="text" 
                    value={divisionAbvr}
                    onChange={(e) => setDivisionAbvr(e.target.value.toUpperCase())}
                    placeholder="e.g., FIN, IT, HR" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Division Office</label>
                  <input 
                    type="text" 
                    value={divisionName}
                    disabled
                    placeholder="Auto-populated from division name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-blue-50 text-gray-700 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">Automatically filled when you enter the division name</p>
                </div>
              </div>

              {/* Preview Table */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Preview</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">ID</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">Name</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">Abvr</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-blue-50 border-b border-gray-200">
                        <td className="px-4 py-2 text-xs text-gray-700">DIV-{Math.random().toString(36).substr(2, 9).toUpperCase()}</td>
                        <td className="px-4 py-2 text-xs text-gray-700">{divisionName || '---'}</td>
                        <td className="px-4 py-2 text-xs text-gray-700">{divisionAbvr || '---'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Aside Footer */}
          <div className="border-t border-gray-200 p-4 flex gap-2 flex-shrink-0">
            <button
              onClick={() => {
                setShowAddDivisionAside(false);
                setDivisionName('');
                setDivisionAbvr('');
              }}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowAddDivisionAside(false);
                setDivisionName('');
                setDivisionAbvr('');
              }}
              className="flex-1 px-4 py-2 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 transition"
            >
              Save
            </button>
          </div>
        </div>
      )}
      {/* Modal */}
      {modal.type && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center border-b-4 border-blue-700">
              <h2 className="text-2xl font-bold">
                {modal.type === 'division' && 'Divisions'}
                {modal.type === 'doctype' && 'Document Types'}
                {modal.type === 'classification' && 'Classifications'}
                {modal.type === 'accounts' && 'User Accounts'}
              </h2>
              <button
                onClick={() => setModal({ type: null })}
                className="p-1 hover:bg-blue-800 rounded-lg transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              {renderModalContent()}
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
              <button
                onClick={() => setModal({ type: null })}
                className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 font-medium transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-md shadow-grey-400/20 backdrop-blur-sm p-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-950">DICT-DES</h2>
        <div className="text-sm text-black-400">Hello, First Lastname</div>
      </header>

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-2xl shadow-blue-400/40 border-r-2 border-blue-300/30 flex flex-col transition-all overflow-hidden`}>
          {/* Toggle Button */}
          <div className="p-4 flex justify-end">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        {/* Profile Section */}
        <div className={`p-6 flex flex-col items-center ${!sidebarOpen && 'hidden'}`}>
          <h2 className="font-semibold text-gray-800 text-center">Full Name</h2>
          <p className="text-xs text-gray-500 text-center">Administrator</p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.id} href={item.id === 'dashboard' ? '/dashboard' : `/dashboard/${item.id}`}>
              <button
                className={`w-full text-left px-4 py-3 rounded-lg transition ${
                  item.id === 'utilities'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-gray-600 hover:bg-gray-100'
                } ${!sidebarOpen && 'justify-center px-2'}`}
              >
                <span className={`${!sidebarOpen && 'mr-0'} mr-2`}>{item.icon}</span>
                {sidebarOpen && item.label}
              </button>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className={`p-4 ${!sidebarOpen && 'flex justify-center'}`}>
          <button className={`py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition ${sidebarOpen ? 'w-full' : 'p-2'}`}>
            {sidebarOpen ? 'LOGOUT' : '🚪'}
          </button>
        </div>

        {/* Bottom Logos */}
        <div className={`p-4 flex justify-center gap-3 ${!sidebarOpen && 'flex-col'}`}>
          <Image
            src="/dict.png"
            alt="DICT Logo"
            width={40}
            height={40}
            className="cursor-pointer hover:opacity-80"
          />
          <Image
            src="/Pilipns.png"
            alt="Bagong Pilipinas Logo"
            width={40}
            height={40}
            className="cursor-pointer hover:opacity-80"
          />
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 bg-white p-8">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-900">Utilities</h3>
            <p className="text-gray-500 text-sm mt-2">Manage system settings and configurations</p>
          </div>

          {/* Utilities Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            {utilities.map((utility) => (
              <button
                key={utility.id}
                onClick={() => {
                  if (['division', 'doctype', 'classification', 'accounts'].includes(utility.id)) {
                    setSelectedSection(utility.id as any);
                  }
                }}
                className={`px-6 py-3 font-medium rounded-lg transition ${
                  selectedSection === utility.id
                    ? 'bg-blue-900 text-white border-2 border-blue-900'
                    : 'bg-white text-gray-800 border-2 border-gray-300 hover:border-gray-400'
                }`}
              >
                {utility.title}
              </button>
            ))}
          </div>

          {/* Division Section */}
          {selectedSection === 'division' && (
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Divisions</h3>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowAddDivisionAside(true)}
                    className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 font-medium transition">
                    + New Entry
                  </button>
                  <button
                    onClick={() => setSelectedSection(null)}
                    className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b-2 border-gray-300">
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Name</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {['Finance', 'IT', 'HR', 'Operations', 'Legal'].map((item, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3 text-gray-700">{item}</td>
                        <td className="px-4 py-3 flex justify-end gap-2">
                          <button className="px-3 py-1 text-blue-600 border border-blue-600 hover:bg-blue-50 rounded text-sm font-medium transition">Edit</button>
                          <button className="px-3 py-1 text-red-600 border border-red-600 hover:bg-red-50 rounded text-sm font-medium transition">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Document Type Section */}
          {selectedSection === 'doctype' && (
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Document Types</h3>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowAddDocTypeAside(true)}
                    className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 font-medium transition">
                    + New Entry
                  </button>
                  <button
                    onClick={() => setSelectedSection(null)}
                    className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b-2 border-gray-300">
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Name</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {documentTypes.map((item, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3 text-gray-700">{item}</td>
                        <td className="px-4 py-3 flex justify-end gap-2">
                          <button className="px-3 py-1 text-blue-600 border border-blue-600 hover:bg-blue-50 rounded text-sm font-medium transition">Edit</button>
                          <button className="px-3 py-1 text-red-600 border border-red-600 hover:bg-red-50 rounded text-sm font-medium transition">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Document Classification Section */}
          {selectedSection === 'classification' && (
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Document Classifications</h3>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowAddClassificationAside(true)}
                    className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 font-medium transition">
                    + New Entry
                  </button>
                  <button
                    onClick={() => setSelectedSection(null)}
                    className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b-2 border-gray-300">
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Name</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {documentClassifications.map((item, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3"><span className={`px-3 py-1 rounded text-sm font-medium ${item.color}`}>{item.name}</span></td>
                        <td className="px-4 py-3 flex justify-end gap-2">
                          <button className="px-3 py-1 text-blue-600 border border-blue-600 hover:bg-blue-50 rounded text-sm font-medium transition">Edit</button>
                          <button className="px-3 py-1 text-red-600 border border-red-600 hover:bg-red-50 rounded text-sm font-medium transition">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Accounts Section */}
          {selectedSection === 'accounts' && (
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">User Accounts</h3>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowAddAccountAside(true)}
                    className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 font-medium transition">
                    + New Entry
                  </button>
                  <button
                    onClick={() => setSelectedSection(null)}
                    className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b-2 border-gray-300">
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Name</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Email</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Division</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Role</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {userAccounts.map((item, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3 text-gray-700 font-medium">{item.name}</td>
                        <td className="px-4 py-3 text-gray-700 text-sm">{item.email}</td>
                        <td className="px-4 py-3 text-gray-700 text-sm">{item.division}</td>
                        <td className="px-4 py-3"><span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">{item.role}</span></td>
                        <td className="px-4 py-3 flex justify-end gap-2">
                          <button className="px-3 py-1 text-blue-600 border border-blue-600 hover:bg-blue-50 rounded text-sm font-medium transition">Edit</button>
                          <button className="px-3 py-1 text-red-600 border border-red-600 hover:bg-red-50 rounded text-sm font-medium transition">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
      </div>
    </div>
  );
}
