import Sidebar from "./Sidebar";
import EmployeePage from "./../Employes/Employe";
function Dashboard() {
  return (
      <div className="flex min-h-screen bg-gray-100">

          {/* Main Content Area */}
          <div className="flex-1 ml-80 p-6">
            <Sidebar />

              {/* Dashboard Content */}
              <div className="mt-24">
                  <EmployeePage />
              </div>
          </div>
      </div>
  );
}

export default Dashboard;