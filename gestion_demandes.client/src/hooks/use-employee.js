import { useState, useCallback } from "react"
import { employeeService } from "../services/EmployeService"
import { useToast } from "./use-toast"

// Custom hook for employee data management
export const useEmployees = () => {
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { showToast } = useToast()

    const fetchEmployees = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const data = await employeeService.getAll()
            console.log("Employee data from API:", data); // Debug log
            setEmployees(data)
        } catch (err) {
            setError(err.message || "Failed to fetch employees")
            showToast("error", "�chec du chargement des employ�s")
        } finally {
            setLoading(false)
        }
    }, [showToast])

    const addEmployee = useCallback(
        async (employee) => {
            try {
                console.log("Adding employee:", employee)
                await employeeService.create(employee)
                showToast("success", "Employ� ajout� avec succ�s")
                await fetchEmployees()
                return true
            } catch (err) {
                console.error("Error adding employee:", err)
                showToast("error", `�chec de l'ajout de l'employ�: ${err.message}`)
                return false
            }
        },
        [fetchEmployees, showToast],
    )

    const updateEmployee = useCallback(
        async (employee) => {
            try {
                console.log("Updating employee:", employee)
                await employeeService.update(employee)
                showToast("success", "Employ� mis � jour avec succ�s")
                await fetchEmployees()
                return true
            } catch (err) {
                console.error("Error updating employee:", err)
                showToast("error", `�chec de la mise � jour de l'employ�: ${err.message}`)
                return false
            }
        },
        [fetchEmployees, showToast],
    )

    const deleteEmployee = useCallback(
        async (matricule) => {
            try {
                await employeeService.delete(matricule)
                showToast("success", "Employ� supprim� avec succ�s")
                await fetchEmployees()
                return true
            } catch (err) {
                showToast("error", `�chec de la suppression de l'employ�: ${err.message}`)
                return false
            }
        },
        [fetchEmployees, showToast],
    )

    return {
        employees,
        loading,
        error,
        fetchEmployees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
    }
}