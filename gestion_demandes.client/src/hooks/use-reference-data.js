
import { useState, useEffect, useCallback } from "react"
import { departmentService } from "../services/DepartementService"
import { roleService } from "../services/RoleService"
import { useToast } from "./use-toast"

// Custom hook for fetching reference data (departments and roles)
export const useReferenceData = () => {
    const [departments, setDepartments] = useState([])
    const [roles, setRoles] = useState([])
    const [loading, setLoading] = useState(true)
    const { showToast } = useToast()

    const fetchReferenceData = useCallback(async () => {
        setLoading(true)
        try {
            const [departmentsData, rolesData] = await Promise.all([departmentService.getAll(), roleService.getAll()])

            console.log("Departments data:", departmentsData);
            console.log("Roles data:", rolesData);

            setDepartments(departmentsData)
            setRoles(rolesData)
        } catch (error) {
            showToast("error", "Échec du chargement des données de référence")
            console.error("Error loading reference data:", error)
        } finally {
            setLoading(false)
        }
    }, [showToast])

    useEffect(() => {
        fetchReferenceData()
    }, [fetchReferenceData])

    return {
        departments,
        roles,
        loading,
        refreshReferenceData: fetchReferenceData,
    }
}