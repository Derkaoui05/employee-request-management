import apiClient from "./api-client"

// Repository pattern - Employee specific API calls
export const employeeService = {
    getAll: () => apiClient("Employes"),

    getById: (matricule) => apiClient(`Employes/${matricule}`),

    create: (employee) => {
        // Format the data before sending to the API
        const formattedEmployee = formatEmployeeData(employee)

        return apiClient("Employes", {
            method: "POST",
            body: JSON.stringify(formattedEmployee),
        })
    },

    update: (employee) => {
        // Format the data before sending to the API
        const formattedEmployee = formatEmployeeData(employee, true)

        return apiClient(`Employes/${employee.matricule}`, {
            method: "PUT",
            body: JSON.stringify(formattedEmployee),
        })
    },

    delete: (matricule) =>
        apiClient(`Employes/${matricule}`, {
            method: "DELETE",
        }),
}

// Helper function to format employee data
function formatEmployeeData(employee, isUpdate = false) {
    // Create a copy to avoid modifying the original
    const formattedEmployee = { ...employee }

    // Convert empty strings to null for optional fields
    if (formattedEmployee.idDepartement === "") formattedEmployee.idDepartement = null

    // Handle password for updates
    if (isUpdate && formattedEmployee.motDePasse === "") {
        // If updating and password is empty, remove it from the payload
        delete formattedEmployee.motDePasse
    }

    // Ensure date is in the correct format
    if (formattedEmployee.dateEmbauche) {
        // Keep the date in ISO format for the API
        formattedEmployee.dateEmbauche = new Date(formattedEmployee.dateEmbauche).toISOString()
    } else {
        formattedEmployee.dateEmbauche = new Date().toISOString() // Default to current date
    }

    // Convert string IDs to numbers
    formattedEmployee.matricule = Number(formattedEmployee.matricule)
    formattedEmployee.idRole = Number(formattedEmployee.idRole)
    if (formattedEmployee.idDepartement) formattedEmployee.idDepartement = Number(formattedEmployee.idDepartement)

    // Remove any properties that shouldn't be sent to the API
    delete formattedEmployee.nomRole
    delete formattedEmployee.nomDepartement

    return formattedEmployee
}