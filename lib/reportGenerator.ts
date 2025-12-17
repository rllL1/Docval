export interface ReportData {
  title: string;
  referenceNo: string;
  classification: string;
  typeOfDocuments: string;
  extractedText: string;
}

export interface GeneratedReport {
  summary: string;
  keyPoints: string[];
  classification: string;
  nextSteps: string[];
}

// Hugging Face Summarization Function
export async function generateReportWithHuggingFace(data: ReportData): Promise<GeneratedReport> {
  const { title, referenceNo, classification, typeOfDocuments, extractedText } = data;
  
  const hfApiKey = process.env.NEXT_PUBLIC_HF_API_KEY;
  if (!hfApiKey) {
    throw new Error('Hugging Face API key not configured');
  }

  try {
    console.log('🤗 Calling Hugging Face API for summarization...');
    
    // Use Hugging Face summarization model
    const summaryResponse = await fetch(
      'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
      {
        headers: { Authorization: `Bearer ${hfApiKey}` },
        method: 'POST',
        body: JSON.stringify({
          inputs: extractedText.substring(0, 1024), // BART has token limits
          parameters: {
            max_length: 150,
            min_length: 50,
          },
        }),
      }
    );

    if (!summaryResponse.ok) {
      const errorData = await summaryResponse.text();
      console.error('HF API Error:', errorData);
      throw new Error(`Hugging Face API error: ${summaryResponse.status}`);
    }

    const summaryData = await summaryResponse.json();
    const aiSummary = summaryData[0]?.summary_text || extractedText.substring(0, 200);

    console.log('✅ Hugging Face summary generated');

    // Extract key points using keyword extraction
    const sentences = extractedText.split(/[.!?]+/).filter(s => s.trim().length > 20);
    const importantKeywords = [
      'important', 'critical', 'urgent', 'must', 'required', 'approved', 'rejected',
      'decision', 'recommendation', 'conclusion', 'result', 'findings', 'significant',
    ];

    const keyPoints: string[] = [];
    sentences.forEach(sentence => {
      const lowerSentence = sentence.toLowerCase();
      if (importantKeywords.some(keyword => lowerSentence.includes(keyword))) {
        const cleanSentence = sentence.trim();
        if (cleanSentence.length > 30 && !keyPoints.includes(cleanSentence)) {
          keyPoints.push(cleanSentence);
        }
      }
    });

    if (keyPoints.length === 0) {
      for (let i = 0; i < Math.min(3, sentences.length); i++) {
        keyPoints.push(sentences[i].trim());
      }
    }

    const nextSteps = generateNextSteps(typeOfDocuments, classification);

    return {
      summary: `${typeOfDocuments} "${title}" (Ref: ${referenceNo}). ${aiSummary}`,
      keyPoints: keyPoints.slice(0, 5),
      classification: determineClassification(extractedText, classification),
      nextSteps,
    };
  } catch (error) {
    console.error('Error with Hugging Face API:', error);
    // Fallback to free generator
    return generateReportWithoutAI(data);
  }
}

// Free (No AI) Report Generator
export async function generateReportWithoutAI(data: ReportData): Promise<GeneratedReport> {
  const { title, referenceNo, classification, typeOfDocuments, extractedText } = data;

  // Extract key sentences (sentences with important words)
  const sentences = extractedText.split(/[.!?]+/).filter(s => s.trim().length > 20);
  
  // Keywords that indicate important information
  const importantKeywords = [
    'important', 'critical', 'urgent', 'must', 'required', 'approved', 'rejected',
    'decision', 'recommendation', 'conclusion', 'result', 'findings', 'significant',
    'action', 'deadline', 'complete', 'process', 'policy'
  ];

  // Find key sentences
  const keyPoints: string[] = [];
  sentences.forEach(sentence => {
    const lowerSentence = sentence.toLowerCase();
    if (importantKeywords.some(keyword => lowerSentence.includes(keyword))) {
      const cleanSentence = sentence.trim();
      if (cleanSentence.length > 30 && !keyPoints.includes(cleanSentence)) {
        keyPoints.push(cleanSentence);
      }
    }
  });

  // If no key points found, use first few sentences
  if (keyPoints.length === 0) {
    for (let i = 0; i < Math.min(3, sentences.length); i++) {
      keyPoints.push(sentences[i].trim());
    }
  }

  // Limit to 5 key points
  const limitedKeyPoints = keyPoints.slice(0, 5);

  // Generate summary
  const summary = `${typeOfDocuments} "${title}" (Reference: ${referenceNo}) with ${classification} classification. ${sentences.slice(0, 2).join('. ')}.`;

  // Classification recommendation
  const classificationRec = determineClassification(extractedText, classification);

  // Generate next steps based on document type
  const nextSteps = generateNextSteps(typeOfDocuments, classification);

  return {
    summary,
    keyPoints: limitedKeyPoints,
    classification: classificationRec,
    nextSteps,
  };
}

function determineClassification(text: string, currentClassification: string): string {
  const lowerText = text.toLowerCase();
  
  const confidentialKeywords = ['confidential', 'secret', 'restricted', 'sensitive', 'internal only'];
  const publicKeywords = ['public', 'published', 'release', 'open'];
  const internalKeywords = ['internal', 'employee', 'staff', 'department'];

  if (confidentialKeywords.some(kw => lowerText.includes(kw))) {
    return 'Confidential - Handle with care';
  }
  if (publicKeywords.some(kw => lowerText.includes(kw))) {
    return 'Public - Can be shared openly';
  }
  if (internalKeywords.some(kw => lowerText.includes(kw))) {
    return 'Internal - For organizational use';
  }
  return currentClassification;
}

function generateNextSteps(documentType: string, classification: string): string[] {
  const steps: string[] = [];

  // Based on document type
  switch (documentType.toLowerCase()) {
    case 'form':
      steps.push('Review form for completeness');
      steps.push('Verify all required fields are filled');
      steps.push('Route for approval if needed');
      break;
    case 'report':
      steps.push('Review findings and recommendations');
      steps.push('Schedule review meeting with stakeholders');
      steps.push('Implement recommended actions');
      break;
    case 'letter':
      steps.push('Verify recipient address');
      steps.push('Prepare for distribution');
      steps.push('Track delivery confirmation');
      break;
    case 'memo':
      steps.push('Distribute to intended recipients');
      steps.push('Confirm receipt and understanding');
      steps.push('Monitor action items');
      break;
    case 'certificate':
      steps.push('Validate credentials');
      steps.push('File in appropriate records');
      steps.push('Schedule renewal if applicable');
      break;
    default:
      steps.push('Review document content');
      steps.push('Determine appropriate action');
      steps.push('File and archive');
  }

  // Add classification-based steps
  if (classification.includes('Confidential')) {
    steps.push('Limit access to authorized personnel only');
  }

  return steps;
}
