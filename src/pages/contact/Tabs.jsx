export default function Tabs({ tab, setTab }) {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
      <button
        onClick={() => setTab("quick")}
        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
          tab === "quick" ? "bg-white shadow" : "text-gray-500"
        }`}
      >
        Quick connect
      </button>
      <button
        onClick={() => setTab("form")}
        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
          tab === "form" ? "bg-white shadow" : "text-gray-500"
        }`}
      >
        Fill a form
      </button>
    </div>
  );
}
