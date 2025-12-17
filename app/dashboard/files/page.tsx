'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface FileItem {
  id: number;
  name: string;
  category: string;
  date: string;
  status: string;
  referenceNo: string;
  title: string;
  classification: string;
  typeOfDocuments: string;
  senderOffice: string;
  senderContact: string;
  content: string;
  report: string;
}

export default function FilesPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [viewTab, setViewTab] = useState<'info' | 'original' | 'report'>('info');
  const [files, setFiles] = useState([
    { id: 1, name: 'TOR FORMS', category: 'misc-forms', date: 'Dec. 12, 2025', status: 'Active', referenceNo: 'REF-001', title: 'Terms of Reference Form', classification: 'Confidential', typeOfDocuments: 'Form', senderOffice: 'DICT', senderContact: 'dict@gov.ph', content: 'This is the content of the TOR FORMS document...', report: 'EXECUTIVE SUMMARY\nThis document contains the terms of reference...\n\nKEY POINTS\n1. Important point 1\n2. Important point 2' },
    { id: 2, name: 'TOR FORMS', category: 'misc-forms', date: 'Dec. 12, 2025', status: 'Active', referenceNo: 'REF-002', title: 'Terms of Reference Form', classification: 'Internal', typeOfDocuments: 'Form', senderOffice: 'DICT', senderContact: 'dict@gov.ph', content: 'This is the content of the TOR FORMS document...', report: 'EXECUTIVE SUMMARY\nThis document contains the terms of reference...\n\nKEY POINTS\n1. Important point 1\n2. Important point 2' },
    { id: 3, name: 'TOR FORMS', category: 'misc-forms', date: 'Dec. 12, 2025', status: 'Active', referenceNo: 'REF-003', title: 'Terms of Reference Form', classification: 'Public', typeOfDocuments: 'Form', senderOffice: 'DICT', senderContact: 'dict@gov.ph', content: 'This is the content of the TOR FORMS document...', report: 'EXECUTIVE SUMMARY\nThis document contains the terms of reference...\n\nKEY POINTS\n1. Important point 1\n2. Important point 2' },
    { id: 4, name: 'TOR FORMS', category: 'misc-forms', date: 'Dec. 12, 2025', status: 'Active', referenceNo: 'REF-004', title: 'Terms of Reference Form', classification: 'Restricted', typeOfDocuments: 'Form', senderOffice: 'DICT', senderContact: 'dict@gov.ph', content: 'This is the content of the TOR FORMS document...', report: 'EXECUTIVE SUMMARY\nThis document contains the terms of reference...\n\nKEY POINTS\n1. Important point 1\n2. Important point 2' },
  ]);

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

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Right Aside Panel */}
      {selectedFile && (
        <div className="fixed right-0 top-0 h-full w-full md:w-150 bg-white shadow-lg z-50 flex flex-col">
          {/* Aside Header */}
          <div className="bg-gray-500 px-8 py-1 flex justify-between items-center flex-shrink-0">
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-bold text-white truncate">{selectedFile.title}</h2>
              <p className="text-blue-100 text-xs mt-1">{selectedFile.referenceNo}</p>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="p-1.5 hover:bg-blue-700 rounded transition text-white flex-shrink-0 ml-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 bg-gray-50 px-2 flex-shrink-0">
            <button
              onClick={() => setViewTab('info')}
              className={`flex-1 px-3 py-2.5 font-medium text-xs transition ${
                viewTab === 'info'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Info
            </button>
            <button
              onClick={() => setViewTab('original')}
              className={`flex-1 px-3 py-2.5 font-medium text-xs transition ${
                viewTab === 'original'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Document
            </button>
            <button
              onClick={() => setViewTab('report')}
              className={`flex-1 px-3 py-2.5 font-medium text-xs transition ${
                viewTab === 'report'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Report
            </button>
          </div>

          {/* Aside Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {viewTab === 'info' && (
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase">Reference</p>
                  <p className="text-sm text-gray-900 mt-1">{selectedFile.referenceNo}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase">Date</p>
                  <p className="text-sm text-gray-900 mt-1">{selectedFile.date}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase">Classification</p>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold mt-1 ${
                    selectedFile.classification === 'Confidential' ? 'bg-red-100 text-red-800' :
                    selectedFile.classification === 'Public' ? 'bg-green-100 text-green-800' :
                    selectedFile.classification === 'Internal' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {selectedFile.classification}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase">Status</p>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold mt-1 ${selectedFile.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {selectedFile.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase">Type</p>
                  <p className="text-sm text-gray-900 mt-1">{selectedFile.typeOfDocuments}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase">Office</p>
                  <p className="text-sm text-gray-900 mt-1">{selectedFile.senderOffice}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase">Contact</p>
                  <p className="text-sm text-gray-900 mt-1 break-all">{selectedFile.senderContact}</p>
                </div>
              </div>
            )}

            {viewTab === 'original' && (
              <div className="bg-white rounded border border-gray-200 p-3 max-h-96 overflow-y-auto">
                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{selectedFile.content}</p>
              </div>
            )}

            {viewTab === 'report' && (
              <div className="bg-white rounded border border-gray-200 p-3 max-h-96 overflow-y-auto">
                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{selectedFile.report}</p>
              </div>
            )}
          </div>

          {/* Aside Footer */}
          <div className="border-t border-gray-200 p-3 flex-shrink-0">
            <button
              onClick={() => setSelectedFile(null)}
              className="w-full px-3 py-2 bg-gray-200 text-gray-800 font-medium rounded hover:bg-gray-300 transition text-sm"
            >
              Close
            </button>
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
                  item.id === 'files'
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
          <button 
            onClick={() => router.push('/login')}
            className={`py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition ${sidebarOpen ? 'w-full' : 'p-2'}`}>
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
        <main className="flex-1 bg-white p-6">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-3xl font-bold text-gray-800">Files Management</h3>
                <p className="text-gray-500 text-sm mt-1">Manage and organize your documents</p>
              </div>
              <Link href="/dashboard/files/new-entry">
                <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg">
                  + New Entry
                </button>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full md:w-80 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>
          </div>

          {/* Files Table */}
          <div className="w-full">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
              <thead>
                <tr className="bg-blue-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Document</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date Received</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {files.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.category}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded text-xs font-medium ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setSelectedFile(item);
                            setViewTab('info');
                          }}
                          className="px-3 py-1.5 text-sm font-medium text-blue-600 border border-blue-600 hover:bg-blue-50 rounded transition">
                          View
                        </button>
                        <button 
                          onClick={() => setFiles(files.filter(f => f.id !== item.id))}
                          className="px-3 py-1.5 text-sm font-medium text-red-600 border border-red-600 hover:bg-red-50 rounded transition">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </main>
      </div>
      </div>
    </div>
  );
}
