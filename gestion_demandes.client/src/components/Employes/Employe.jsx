import { useState } from "react"
import { EmployeeProvider } from "../../context/employe-context"
import EmployeeList from "./EmployeList"
import EmployeeForm from "./EmployeeForm"
import ExportButton from "./ExportButton"

const EmployeePage = () => {
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [isAddingEmployee, setIsAddingEmployee] = useState(false)

    const handleAddNew = () => {
        setSelectedEmployee(null)
        setIsAddingEmployee(true)
    }

    const handleEdit = (employee) => {
        setSelectedEmployee(employee)
        setIsAddingEmployee(true)
    }

    const handleSave = () => {
        setSelectedEmployee(null)
        setIsAddingEmployee(false)
    }

    const handleCancel = () => {
        setSelectedEmployee(null)
        setIsAddingEmployee(false)
    }

    return (
        <EmployeeProvider>
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">Gestion des Employes</h1>

                    {!isAddingEmployee && (
                        <div className="mb-6 flex justify-between">
                            <button
                                onClick={handleAddNew}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Ajouter un employe
                            </button>

                            <ExportButton />
                        </div>
                    )}

                    {isAddingEmployee ? (
                        <EmployeeForm employee={selectedEmployee} onSave={handleSave} onCancel={handleCancel} />
                    ) : (
                        <EmployeeList onEdit={handleEdit} />
                    )}
                </div>
            </div>
        </EmployeeProvider>
    )
}

export default EmployeePage