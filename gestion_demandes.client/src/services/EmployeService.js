import apiClient from "./api-client"

export const employeeService = {
    getAll: async () => {
        const employees = await apiClient("Employes")

        console.log("Raw API response:", employees)

        return employees.map((employee) => {
            const employeeWithDetails = { ...employee }

            if (employee.departement && employee.departement.nomDepartement) {
                // D�j� correctement format�, ne rien faire
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
                    nomDepartement: `D�partement ${employee.idDepartement}`
                }
            }

            if (employee.role && employee.role.nomRole) {
                // D�j� correctement format�
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
                    nomRole: `R�le ${employee.idRole}`
                }
            }

            return employeeWithDetails
        })
    },

    // R�cup�rer un employ� par son matricule
    getById: (matricule) => apiClient(`Employes/${matricule}`),

    // R�cup�rer le solde de cong�s d'un employ�
    getLeaveBalance: (matricule) => apiClient(`Employes/${matricule}/solde-conge`),

    // R�cup�rer les demandes d'un employ�
    getEmployeeRequests: (matricule) => apiClient(`Demandes/employe/${matricule}`),

    // Cr�er un nouvel employ�
    create: (employee) => {
        // Formater les donn�es avant l'envoi � l'API
        const formattedEmployee = formatEmployeeData(employee)

        return apiClient("Employes", {
            method: "POST",
            body: JSON.stringify(formattedEmployee),
        })
    },

    // Mettre � jour un employ� existant
    update: (employee) => {
        // Formater les donn�es avant l'envoi � l'API
        const formattedEmployee = formatEmployeeData(employee, true)

        return apiClient(`Employes/${employee.matricule}`, {
            method: "PUT",
            body: JSON.stringify(formattedEmployee),
        })
    },

    // Supprimer un employ�
    delete: (matricule) =>
        apiClient(`Employes/${matricule}`, {
            method: "DELETE",
        }),
}

// Fonction utilitaire pour formater les donn�es d'un employ�
function formatEmployeeData(employee, isUpdate = false) {
    // Cr�er une copie pour �viter de modifier l'original
    const formattedEmployee = { ...employee }

    // Convertir les cha�nes vides en null pour les champs optionnels
    if (formattedEmployee.idDepartement === "") formattedEmployee.idDepartement = null

    // G�rer le mot de passe pour les mises � jour
    if (isUpdate && formattedEmployee.motDePasse === "") {
        // Si mise � jour et mot de passe vide, le supprimer du payload
        delete formattedEmployee.motDePasse
    }

    // S'assurer que la date est au bon format
    if (formattedEmployee.dateEmbauche) {
        // Garder la date au format ISO pour l'API
        formattedEmployee.dateEmbauche = new Date(formattedEmployee.dateEmbauche).toISOString()
    } else {
        formattedEmployee.dateEmbauche = new Date().toISOString() // Par d�faut � la date actuelle
    }

    // Convertir les IDs en nombres
    formattedEmployee.matricule = Number(formattedEmployee.matricule)
    formattedEmployee.idRole = Number(formattedEmployee.idRole)
    if (formattedEmployee.idDepartement) formattedEmployee.idDepartement = Number(formattedEmployee.idDepartement)

    // Supprimer les propri�t�s de navigation qui pourraient causer des probl�mes
    delete formattedEmployee.role
    delete formattedEmployee.departement
    delete formattedEmployee.demandes

    return formattedEmployee
}