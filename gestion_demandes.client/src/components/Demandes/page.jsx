import EmployeeRequestForm from "./EmployeeRequestForm"
import { EmployeeProvider } from "../../context/employe-context"

export default function DemandesPage() {
    return (
        <EmployeeProvider>
            <div className="min-h-screen bg-gray-100 p-6">
                <EmployeeRequestForm />
            </div>
        </EmployeeProvider>
    )
}