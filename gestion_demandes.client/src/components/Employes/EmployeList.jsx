
import { useEffect } from "react"
import { useEmployeeContext } from "../../context/employe-context"
import EmployeeTable from "./EmployeeTable"
import { Toast } from "../../ui/Toast"
import { useToast } from "../../hooks/use-toast"

const EmployeeList = ({ onEdit }) => {
    const { employees, loading, error, fetchEmployees } = useEmployeeContext()
    const { toast, hideToast } = useToast()

    useEffect(() => {
        fetchEmployees()
    }, [fetchEmployees])

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
            </div>
        )
    }

    return (
        <>
            <EmployeeTable employees={employees} onEdit={onEdit} />
            <Toast visible={toast.visible} message={toast.message} type={toast.type} onClose={hideToast} />
        </>
    )
}

export default EmployeeList