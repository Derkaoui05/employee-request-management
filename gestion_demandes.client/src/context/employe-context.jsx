

import { createContext, useContext } from "react"
import { useEmployees } from "../hooks/use-employee"

const EmployeeContext = createContext(null)

export const EmployeeProvider = ({ children }) => {
    const employeeData = useEmployees()

    return <EmployeeContext.Provider value={employeeData}>{children}</EmployeeContext.Provider>
}

export const useEmployeeContext = () => {
    const context = useContext(EmployeeContext)
    if (!context) {
        throw new Error("useEmployeeContext must be used within an EmployeeProvider")
    }
    return context
}