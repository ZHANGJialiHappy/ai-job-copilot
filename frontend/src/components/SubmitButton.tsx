interface Props {
  onClick: () => void;
  disabled: boolean;
}

export default function SubmitButton({ onClick, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 disabled:bg-gray-400"
    >
      Analyze
    </button>
  );
}
