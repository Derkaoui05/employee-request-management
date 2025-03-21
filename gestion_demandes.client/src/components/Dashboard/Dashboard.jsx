import Sidebar from "./Sidebar";

function Dashboard({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 ml-80 p-6">
                <div className="mt-24">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
