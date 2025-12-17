'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface SummaryData {
  documentName: string;
  fileName: string;
  fileSize: string;
  referenceNo: string;
  title: string;
  classification: string;
  typeOfDocuments: string;
  senderOffice: string;
  senderContact: string;
  extractedText: string;
  summaryLines: string[];
  generatedReport?: string;
  uploadedAt: string;
}

export default function SummaryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const summaryParam = searchParams.get('summaryData');
    if (summaryParam) {
      try {
        const data = JSON.parse(decodeURIComponent(summaryParam));
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSummaryData(data);
      } catch (error) {
        console.error('Error parsing summary data:', error);
      }
    }
    setIsLoading(false);
  }, [searchParams]);

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
        <main className="flex-1 bg-white p-6 flex items-center justify-center overflow-auto">
          <div className="bg-white rounded-lg shadow-2xl shadow-blue-400/40 border border-blue-200 p-8 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-2xl font-bold text-gray-800">Document Summary</h4>
              <Link href="/dashboard/files/new-entry">
                <button className="text-gray-500 hover:text-gray-700 text-2xl">
                  ×
                </button>
              </Link>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading summary...</p>
              </div>
            ) : summaryData ? (
              <div className="space-y-6 max-h-screen-lg overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* LEFT SIDE - DOCUMENT DETAILS (NO BORDER) */}
                  <div className="space-y-3 lg:col-span-1">
                    {/* Document Details */}
                    <div>
                      <h5 className="text-xs font-bold text-gray-800 mb-1 uppercase">Reference</h5>
                      <p className="text-xs text-gray-600">{summaryData.referenceNo}</p>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-gray-800 mb-1 uppercase">Title</h5>
                      <p className="text-xs text-gray-600 truncate">{summaryData.title}</p>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-gray-800 mb-1 uppercase">Classification</h5>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                        summaryData.classification === 'Confidential' ? 'bg-red-100 text-red-800' :
                        summaryData.classification === 'Public' ? 'bg-green-100 text-green-800' :
                        summaryData.classification === 'Internal' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {summaryData.classification}
                      </span>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-gray-800 mb-1 uppercase">Type</h5>
                      <p className="text-xs text-gray-600">{summaryData.typeOfDocuments}</p>
                    </div>

                    <hr className="my-2" />

                    {/* Sender Details */}
                    <div>
                      <h5 className="text-xs font-bold text-gray-800 mb-1 uppercase">Office</h5>
                      <p className="text-xs text-gray-600">{summaryData.senderOffice}</p>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-gray-800 mb-1 uppercase">Contact</h5>
                      <p className="text-xs text-gray-600 truncate">{summaryData.senderContact}</p>
                    </div>

                    <hr className="my-2" />

                    {/* File Info */}
                    <div>
                      <h5 className="text-xs font-bold text-gray-800 mb-1 uppercase">File Name</h5>
                      <p className="text-xs text-gray-600 truncate">{summaryData.documentName}</p>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-gray-800 mb-1 uppercase">Size</h5>
                      <p className="text-xs text-gray-600">{summaryData.fileSize} MB</p>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-gray-800 mb-1 uppercase">Uploaded</h5>
                      <p className="text-xs text-gray-600">{new Date(summaryData.uploadedAt).toLocaleDateString()}</p>
                    </div>

                    {/* Document Preview */}
                    {summaryData.extractedText && (
                      <>
                        <hr className="my-2" />
                        <div>
                          <h5 className="text-xs font-bold text-gray-800 mb-1 uppercase">Preview</h5>
                          <p className="text-xs text-gray-600 line-clamp-3">{summaryData.extractedText.substring(0, 150)}...</p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* RIGHT SIDE - REPORT (EXPANDED) */}
                  <div className="lg:col-span-3 flex flex-col">
                    <h5 className="text-3xl font-bold text-gray-800 mb-4">📋 REPORT</h5>
                    {summaryData.generatedReport ? (
                      <div className="flex-1 bg-linear-to-br from-purple-50 to-blue-50 border-6 border-purple-500 rounded-2xl p-10 shadow-2xl">
                        <div className="text-gray-700 text-base leading-relaxed overflow-y-auto max-h-96 font-medium">
                          {summaryData.generatedReport}
                        </div>
                      </div>
                    ) : summaryData.summaryLines && summaryData.summaryLines.length > 0 ? (
                      <div className="flex-1 border-6 border-purple-500 rounded-2xl p-10 shadow-2xl overflow-y-auto max-h-96 space-y-4 bg-linear-to-br from-purple-50 to-blue-50">
                        {summaryData.summaryLines.map((line, index) => (
                          <div key={index} className="bg-white border-l-4 border-purple-600 rounded-lg p-4 shadow-md">
                            <p className="text-gray-700 text-base">{line}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex-1 border-6 border-purple-500 rounded-2xl p-10 shadow-2xl flex items-center justify-center bg-linear-to-br from-purple-50 to-blue-50">
                        <p className="text-gray-500 italic text-lg">No summary available from the document.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No summary data available</p>
                <Link href="/dashboard/files/new-entry">
                  <button className="px-6 py-2 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-950">
                    Go Back
                  </button>
                </Link>
              </div>
            )}

            {summaryData && (
              <div className="flex gap-3 pt-6 border-t justify-center">
                <button
                  onClick={() => {
                    alert('Document submitted successfully!');
                    router.push('/dashboard/files');
                  }}
                  className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                >
                  Submit
                </button>
                <Link href="/dashboard/files/new-entry">
                  <button className="px-6 py-2 bg-gray-400 text-gray-800 font-semibold rounded-lg hover:bg-gray-500 transition">
                    Back
                  </button>
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
      </div>
    </div>
  );
}
