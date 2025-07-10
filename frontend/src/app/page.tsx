"use client";

import { useState } from "react";
import FileUpload from "../../components/FileUpload";

export default function Home() {
  const [result, setResult] = useState<string | null>(null);

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">AI Cover Letter Generator</h1>
      <FileUpload />
    </main>
  );
}
