'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as pdfjsLib from 'pdfjs-dist';
import { generateReportWithHuggingFace } from '@/lib/reportGenerator';

// Set up PDF worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function NewEntryPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; type: string; file: File } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [documentTypeList, setDocumentTypeList] = useState(['Form', 'Report', 'Letter', 'Memo', 'Certificate']);
  const [classificationList, setClassificationList] = useState(['Confidential', 'Public', 'Internal', 'Restricted']);
  const [formData, setFormData] = useState({
    // Document Details
    documentName: '',
    referenceNo: '',
    title: '',
    classification: 'Confidential',
    typeOfDocuments: 'Form',
    // Sender Details
    senderOffice: 'DICT',
    senderContact: '',
  });

  // Load document types and classifications from localStorage
  useEffect(() => {
    const savedTypes = localStorage.getItem('documentTypes');
    if (savedTypes) {
      try {
        setDocumentTypeList(JSON.parse(savedTypes));
      } catch (e) {
        console.error('Failed to load document types:', e);
      }
    }

    const savedClassifications = localStorage.getItem('documentClassifications');
    if (savedClassifications) {
      try {
        const classifications = JSON.parse(savedClassifications) as Array<{ name: string; color: string }>;
        setClassificationList(classifications.map((c) => c.name));
      } catch (e) {
        console.error('Failed to load classifications:', e);
      }
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2),
        type: file.type,
        file,
      });
    }
  };

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
      {/* Loading Modal */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Processing Document</h3>
              <p className="text-sm text-gray-600 text-center">Extracting text and generating report...\nPlease wait.</p>
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
        <main className="flex-1 bg-white p-6 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-2xl shadow-blue-400/40 border border-blue-200 p-8 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-2xl font-bold text-gray-800">Add New Entry</h4>
              <Link href="/dashboard/files">
                <button className="text-gray-500 hover:text-gray-700 text-2xl">
                  ×
                </button>
              </Link>
            </div>

            <div className="space-y-6">
              {/* DOCUMENT DETAILS */}
              <div className="border-b pb-4">
                <h5 className="text-lg font-bold text-gray-800 mb-4">DOCUMENT DETAILS</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Reference No.</label>
                    <input
                      type="text"
                      placeholder="Enter reference number"
                      value={formData.referenceNo}
                      onChange={(e) => setFormData({ ...formData, referenceNo: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      placeholder="Enter document title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Classification</label>
                    <select
                      value={formData.classification}
                      onChange={(e) => setFormData({ ...formData, classification: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {classificationList.map((classification) => (
                        <option key={classification} value={classification}>{classification}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Type of Documents</label>
                    <select
                      value={formData.typeOfDocuments}
                      onChange={(e) => setFormData({ ...formData, typeOfDocuments: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {documentTypeList.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* SENDER DETAILS */}
              <div className="border-b pb-4">
                <h5 className="text-lg font-bold text-gray-800 mb-4">SENDER DETAILS</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Division Office</label>
                    <select
                      value={formData.senderOffice}
                      onChange={(e) => setFormData({ ...formData, senderOffice: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>DICT</option>
                      <option>DOF</option>
                      <option>DEPED</option>
                      <option>PNP</option>
                      <option>PIA</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Person/Email</label>
                    <input
                      type="email"
                      placeholder="Enter email"
                      value={formData.senderContact}
                      onChange={(e) => setFormData({ ...formData, senderContact: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* FILE UPLOAD */}
              <div className="pb-4">
                <h5 className="text-lg font-bold text-gray-800 mb-4">FILE UPLOAD</h5>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Document</label>
                  <label className="cursor-pointer block">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition bg-gray-50 hover:bg-blue-50">
                      <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20m-16-8v16m-4-4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                      </svg>
                      <span className="text-blue-600 font-semibold hover:text-blue-700 block">Click to upload</span>
                      <p className="text-xs text-gray-500 mt-1">or drag and drop</p>
                    </div>
                    <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.doc,.docx" />
                  </label>
                  {uploadedFile && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-linear-to-br from-red-100 to-red-50 rounded-lg">
                          <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                            <polyline points="13 2 13 9 20 9" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{uploadedFile.name}</p>
                          <p className="text-xs text-gray-500">{uploadedFile.size} MB</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t justify-center">
              <button
                onClick={async () => {
                  if (formData.referenceNo && formData.title && uploadedFile) {
                    setIsLoading(true);
                    try {
                      console.log('📤 Starting file processing...');
                      
                      // Extract text from PDF
                      let extractedText = '';
                      
                      if (uploadedFile.file.type === 'application/pdf') {
                        console.log('📄 Extracting text from PDF...');
                        const arrayBuffer = await uploadedFile.file.arrayBuffer();
                        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                        
                        let fullText = '';
                        for (let i = 1; i <= pdf.numPages; i++) {
                          const page = await pdf.getPage(i);
                          const textContent = await page.getTextContent();
                          fullText += textContent.items.map((item) => ('str' in item ? item.str : '')).join(' ') + '\n';
                        }
                        extractedText = fullText;
                        console.log(`✅ Extracted ${extractedText.length} characters from PDF`);
                      } else {
                        extractedText = `Document: ${uploadedFile.file.name}. Text extraction for DOCX files coming soon.`;
                      }

                      console.log('🤖 Generating report...');
                      
                      let generatedReport = '';

                      // Use Hugging Face AI for report generation
                      console.log('🤗 Using Hugging Face for summarization...');
                      const hfReport = await generateReportWithHuggingFace({
                        title: formData.title,
                        referenceNo: formData.referenceNo,
                        classification: formData.classification,
                        typeOfDocuments: formData.typeOfDocuments,
                        extractedText: extractedText,
                      });
                      
                      generatedReport = `EXECUTIVE SUMMARY\n${hfReport.summary}\n\nKEY POINTS\n${hfReport.keyPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\nCLASSIFICATION\n${hfReport.classification}\n\nNEXT STEPS\n${hfReport.nextSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
                      console.log('✅ Hugging Face report generated');

                      // Create summary data
                      const summaryData = {
                        documentName: uploadedFile.name,
                        fileName: uploadedFile.name,
                        fileSize: uploadedFile.size,
                        referenceNo: formData.referenceNo,
                        title: formData.title,
                        classification: formData.classification,
                        typeOfDocuments: formData.typeOfDocuments,
                        senderOffice: formData.senderOffice,
                        senderContact: formData.senderContact,
                        extractedText: extractedText.substring(0, 500),
                        summaryLines: generatedReport.split('\n').filter((line: string) => line.trim().length > 0),
                        generatedReport: generatedReport,
                        uploadedAt: new Date().toISOString(),
                      };

                      console.log('✅ Summary data prepared');

                      // Pass data to summary page
                      const params = new URLSearchParams();
                      params.append('summaryData', JSON.stringify(summaryData));

                      router.push(`/dashboard/files/summary?${params.toString()}`);
                    } catch (error) {
                      console.error('❌ Error processing file:', error);
                      alert(
                        `Error: ${error instanceof Error ? error.message : 'Failed to process file'}\n\nMake sure your Gemini API key is valid.`
                      );
                    } finally {
                      setIsLoading(false);
                    }
                  } else {
                    alert('Please fill in all required fields and upload a file');
                  }
                }}
                disabled={isLoading}
                className={`px-6 py-2 ${isLoading ? 'bg-gray-400' : 'bg-blue-900 hover:bg-blue-950'} text-white font-semibold rounded-lg transition`}
              >
                {isLoading ? 'Processing...' : 'Next'}
              </button>
              <Link href="/dashboard/files">
                <button className="px-6 py-2 bg-gray-400 text-gray-800 font-semibold rounded-lg hover:bg-gray-500 transition">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
      </div>
    </div>
  );
}
