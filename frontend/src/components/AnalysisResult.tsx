interface Props {
  result: string;
}

export default function AnalysisResult({ result }: Props) {
  const parsed = parseResult(result);

  return (
    <div className="space-y-4">
      <div className="text-3xl font-bold text-center text-orange-500">
        {parsed.score} out of 100
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Box title="✅ Matching Qualifications" content={parsed.matching} />
        <Box title="❌ Missing Requirements" content={parsed.missing} />
      </div>

      <Box title="⚠️ Resume Improvement Suggestions" content={parsed.improve} />
      <Box title="📄 Generated Cover Letter" content={parsed.coverletter} />
    </div>
  );
}

function Box({ title, content }: { title: string; content: string }) {
  return (
    <div className="border rounded-md p-4 bg-gray-50 shadow-sm">
      <h2 className="font-semibold mb-2">{title}</h2>
      <p className="text-gray-700 whitespace-pre-line">{content}</p>
    </div>
  );
}

function parseResult(result: string) {
  const extract = (label: string) => {
    const pattern = new RegExp(
      `${label}\\s*:\\s*([\\s\\S]*?)(?=\\n\\d\\.\\s|$)`
    );
    const match = result.match(pattern);
    return match ? match[1].trim() : "N/A";
  };

  return {
    score: extract('1\\. Match Score'),
    matching: extract('2\\. Matched key qualifications or skills'),
    missing: extract('3\\. Missing requirements'),
    improve: extract('4\\. Improvement points'),
    coverletter: extract('5\\. Cover letter'),
  }
}
