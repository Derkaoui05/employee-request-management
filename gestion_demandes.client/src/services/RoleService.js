import apiClient from "./api-client"

export const roleService = {
    getAll: () => apiClient("Role"),
}

