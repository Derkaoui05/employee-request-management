import apiClient from "./api-client"

export const departmentService = {
  getAll: () => apiClient("Departement"),
}

