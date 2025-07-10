interface Props {
    label: string
    onFileChange: (file: File | null) => void
  }
  
  export default function FileUpload({ label, onFileChange }: Props) {
    return (
      <div className="border p-4 rounded-md">
        <label className="block mb-2 font-semibold">{label}</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => onFileChange(e.target.files?.[0] || null)}
          className="block w-full"
        />
      </div>
    )
  }
  