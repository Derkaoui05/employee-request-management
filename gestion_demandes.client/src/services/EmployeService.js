import apiClient from "./api-client"

export const employeeService = {
    getAll: async () => {
        const employees = await apiClient("Employes")

        console.log("Raw API response:", employees)

        return employees.map((employee) => {
            const employeeWithDetails = { ...employee }

            if (employee.departement && employee.departement.nomDepartement) {
                // Déjà correctement formaté, ne rien faire
            }
            else if (employee.departement && employee.departement.nom) {
                employeeWithDetails.departement = {
                    ...employee.departement,
                    nomDepartement: employee.departement.nom
                }
            }
            else if (employee.idDepartement) {
                employeeWithDetails.departement = {
                    idDepartement: employee.idDepartement,
                    nomDepartement: `Département ${employee.idDepartement}`
                }
            }

            if (employee.role && employee.role.nomRole) {
                // Déjà correctement formaté
            }
            else if (employee.role && employee.role.nom) {
                employeeWithDetails.role = {
                    ...employee.role,
                    nomRole: employee.role.nom
                }
            }
            else if (employee.idRole) {
                employeeWithDetails.role = {
                    idRole: employee.idRole,
                    nomRole: `Rôle ${employee.idRole}`
                }
            }

            return employeeWithDetails
        })
    },

    // Récupérer un employé par son matricule
    getById: (matricule) => apiClient(`Employes/${matricule}`),

    // Récupérer le solde de congés d'un employé
    getLeaveBalance: (matricule) => apiClient(`Employes/${matricule}/solde-conge`),

    // Récupérer les demandes d'un employé
    getEmployeeRequests: (matricule) => apiClient(`Demandes/employe/${matricule}`),

    // Créer un nouvel employé
    create: (employee) => {
        // Formater les données avant l'envoi à l'API
        const formattedEmployee = formatEmployeeData(employee)

        return apiClient("Employes", {
            method: "POST",
            body: JSON.stringify(formattedEmployee),
        })
    },

    // Mettre à jour un employé existant
    update: (employee) => {
        // Formater les données avant l'envoi à l'API
        const formattedEmployee = formatEmployeeData(employee, true)

        return apiClient(`Employes/${employee.matricule}`, {
            method: "PUT",
            body: JSON.stringify(formattedEmployee),
        })
    },

    // Supprimer un employé
    delete: (matricule) =>
        apiClient(`Employes/${matricule}`, {
            method: "DELETE",
        }),
}

// Fonction utilitaire pour formater les données d'un employé
function formatEmployeeData(employee, isUpdate = false) {
    // Créer une copie pour éviter de modifier l'original
    const formattedEmployee = { ...employee }

    // Convertir les chaînes vides en null pour les champs optionnels
    if (formattedEmployee.idDepartement === "") formattedEmployee.idDepartement = null

    // Gérer le mot de passe pour les mises à jour
    if (isUpdate && formattedEmployee.motDePasse === "") {
        // Si mise à jour et mot de passe vide, le supprimer du payload
        delete formattedEmployee.motDePasse
    }

    // S'assurer que la date est au bon format
    if (formattedEmployee.dateEmbauche) {
        // Garder la date au format ISO pour l'API
        formattedEmployee.dateEmbauche = new Date(formattedEmployee.dateEmbauche).toISOString()
    } else {
        formattedEmployee.dateEmbauche = new Date().toISOString() // Par défaut à la date actuelle
    }

    // Convertir les IDs en nombres
    formattedEmployee.matricule = Number(formattedEmployee.matricule)
    formattedEmployee.idRole = Number(formattedEmployee.idRole)
    if (formattedEmployee.idDepartement) formattedEmployee.idDepartement = Number(formattedEmployee.idDepartement)

    // Supprimer les propriétés de navigation qui pourraient causer des problèmes
    delete formattedEmployee.role
    delete formattedEmployee.departement
    delete formattedEmployee.demandes

    return formattedEmployee
}