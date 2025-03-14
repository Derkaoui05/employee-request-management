
export const Toast = ({ visible, message, type, onClose }) => {
    if (!visible) return null

    const bgColor =
        {
            success: "bg-green-500",
            error: "bg-red-500",
            info: "bg-blue-500",
            warning: "bg-yellow-500",
        }[type] || "bg-blue-500"

    return (
        <div
            className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2 z-50`}
        >
            <span>{message}</span>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    )
}