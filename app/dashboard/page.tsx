'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
      {/* Header */}
      <header className="bg-white shadow-2xl shadow-grey-400/20 backdrop-blur-sm p-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-950">DICT-DES</h2>
        <div className="text-sm text-black-400">Hello, Admin</div>
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
          <h2 className="font-semibold text-gray-800 text-center">Admin</h2>
          <p className="text-xs text-gray-500 text-center">Administrator</p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.id} href={item.id === 'dashboard' ? '/dashboard' : `/dashboard/${item.id}`}>
              <button
                className={`w-full text-left px-4 py-3 rounded-lg transition ${
                  activeMenu === item.id
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
            className={`py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition ${sidebarOpen ? 'w-full' : 'p-2'}`}
          >
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
        <main className="flex-1 bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8">
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 rounded-xl p-8 mb-8 text-white shadow-lg shadow-blue-400/30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-4xl font-bold mb-2">Welcome Back!</h3>
                <p className="text-blue-100 text-lg">Document Management System Dashboard</p>
              </div>
              <div className="hidden lg:block text-blue-300 opacity-20">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Documents */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Documents</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-2">284</h3>
                  <p className="text-xs text-green-600 mt-2">+12 this week</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* User Accounts */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-600">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium">User Accounts</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-2">45</h3>
                  <p className="text-xs text-yellow-600 mt-2">Active users</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 8.646 4 4 0 010-8.646zM15 19H9a6 6 0 016-6h0a6 6 0 016 6v1H9v-1z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Active Users */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Active Users</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-2">18</h3>
                  <p className="text-xs text-green-600 mt-2">Online now</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM6 20h12a6 6 0 00-6-6 6 6 0 00-6 6z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Failed Uploads */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Failed Uploads</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-2">3</h3>
                  <p className="text-xs text-purple-600 mt-2">Requires attention</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Documents */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Recent Documents</h3>
                <Link href="/dashboard/files">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
                </Link>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'TOR FORMS - REF-001', date: 'Today, 2:30 PM', status: 'Active', type: 'Confidential' },
                  { name: 'Project Proposal - REF-002', date: 'Yesterday, 10:15 AM', status: 'Active', type: 'Internal' },
                  { name: 'Monthly Report - REF-003', date: '2 days ago', status: 'Active', type: 'Public' },
                  { name: 'Policy Document - REF-004', date: '3 days ago', status: 'Active', type: 'Restricted' },
                ].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        doc.type === 'Confidential' ? 'bg-red-100 text-red-700' :
                        doc.type === 'Internal' ? 'bg-yellow-100 text-yellow-700' :
                        doc.type === 'Public' ? 'bg-green-100 text-green-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {doc.type}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">
                        {doc.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/dashboard/files/new-entry">
                  <button className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition text-left flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Document
                  </button>
                </Link>
                <Link href="/dashboard/files">
                  <button className="w-full px-4 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition text-left flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Files
                  </button>
                </Link>
                <Link href="/dashboard/utilities">
                  <button className="w-full px-4 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition text-left flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    </svg>
                    Manage Utilities
                  </button>
                </Link>
              </div>

              {/* System Status */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">System Status</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Server</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800 font-medium">● Online</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Database</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800 font-medium">● Healthy</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">API</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800 font-medium">● Operational</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      </div>
    </div>
  );
}
