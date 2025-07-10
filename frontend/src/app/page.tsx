'use client'

import { useState } from 'react'
import FileUpload from '@/components/FileUpload'
import SubmitButton from '@/components/SubmitButton'
import AnalysisResult from '@/components/AnalysisResult'

export default function Home() {
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [jdFile, setJdFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleSubmit = async () => {
    if (!cvFile || !jdFile) return
    setLoading(true)

    const formData = new FormData()
    formData.append('resume', cvFile)
    formData.append('jd', jdFile)

    const res = await fetch('http://localhost:8000/analyze', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    setResult(data.result)
    setLoading(false)
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Resume vs Job Match Analyzer</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FileUpload label="Upload Resume (PDF/DOCX)" onFileChange={setCvFile} />
        <FileUpload label="Upload Job Description (PDF/DOCX)" onFileChange={setJdFile} />
      </div>

      <SubmitButton onClick={handleSubmit} disabled={loading || !cvFile || !jdFile} />

      {loading && <p className="text-gray-500">Analyzing...</p>}

      {result && <AnalysisResult result={result} />}
    </main>
  )
}
