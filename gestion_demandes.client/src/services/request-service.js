import apiClient from "./api-client"

export const requestService = {
    getRequestTypes: () => apiClient("TypesDemande"),
    getEmployeeRequests: (matricule) => apiClient(`Demandes/employe/${matricule}`),
    getAllRequests: () => apiClient("Demandes"), // Ensure this method exists

    createRequest: (request) => {
        const formattedRequest = formatRequestData(request)

        return apiClient("Demandes", {
            method: "POST",
            body: JSON.stringify(formattedRequest),
        })
    },

    updateRequest: (request) => {
        const formattedRequest = formatRequestData(request)

        return apiClient(`Demandes/${request.idDemande}`, {
            method: "PUT",
            body: JSON.stringify(formattedRequest),
        })
    },

    deleteRequest: (idDemande) =>
        apiClient(`Demandes/${idDemande}`, {
            method: "DELETE",
        }),
}

function formatRequestData(request) {
    const formattedRequest = { ...request }

    if (formattedRequest.dateDebut) {
        formattedRequest.dateDebut = new Date(formattedRequest.dateDebut).toISOString()
    }

    if (formattedRequest.dateFin) {
        formattedRequest.dateFin = new Date(formattedRequest.dateFin).toISOString()
    }

    if (formattedRequest.matricule && typeof formattedRequest.matricule === 'string') {
        formattedRequest.matricule = Number(formattedRequest.matricule.replace(/\D/g, ''))
    }

    if (formattedRequest.idType && typeof formattedRequest.idType === 'string') {
        formattedRequest.idType = Number(formattedRequest.idType)
    }

    return formattedRequest
}
