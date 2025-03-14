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
            showToast("error", "Échec du chargement des employés")
        } finally {
            setLoading(false)
        }
    }, [showToast])

    const addEmployee = useCallback(
        async (employee) => {
            try {
                console.log("Adding employee:", employee)
                await employeeService.create(employee)
                showToast("success", "Employé ajouté avec succès")
                await fetchEmployees()
                return true
            } catch (err) {
                console.error("Error adding employee:", err)
                showToast("error", `Échec de l'ajout de l'employé: ${err.message}`)
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
                showToast("success", "Employé mis à jour avec succès")
                await fetchEmployees()
                return true
            } catch (err) {
                console.error("Error updating employee:", err)
                showToast("error", `Échec de la mise à jour de l'employé: ${err.message}`)
                return false
            }
        },
        [fetchEmployees, showToast],
    )

    const deleteEmployee = useCallback(
        async (matricule) => {
            try {
                await employeeService.delete(matricule)
                showToast("success", "Employé supprimé avec succès")
                await fetchEmployees()
                return true
            } catch (err) {
                showToast("error", `Échec de la suppression de l'employé: ${err.message}`)
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