"use client";

import { useState } from "react";

interface Props {
  onResult: (data: any) => void;
}

export default function FileUpload({ onResult }: Props) {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!resumeFile || !jdFile) return alert("Please upload both files.");

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jd", jdFile);

    setLoading(true);
    const res = await fetch("http://localhost:8000/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);
    onResult(data);
  };

  return (
    <div className="space-y-4">
      <div>
        <label>Resume (PDF)</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
        />
      </div>
      <div>
        <label>Job Description (PDF)</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setJdFile(e.target.files?.[0] || null)}
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}
