function SuggestionModal({
  open,
  loading,
  error,
  suggestion,
  onAccept,
  onDiscard,
  labelText,
  onChange
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-[500px] space-y-4">
        <h2 className="text-lg font-semibold">AI Suggestion</h2>

        {loading && <p>{labelText}</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
           <textarea
            className="w-full min-h-[150px] border rounded p-2"
            value={suggestion}
            onChange={(e) => onChange(e.target.value)}
          />
        )}

        <div className="flex justify-end gap-2">
          <button onClick={onDiscard} className="px-4 py-2 border rounded">
            Discard
          </button>
          <button
            onClick={onAccept}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
};

export default SuggestionModal;