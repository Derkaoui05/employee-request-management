import { useState, useCallback } from "react";
import { requestService } from "../services/request-service";
import { useToast } from "./use-toast";

export const useRequests = (employeeMode = false, matricule = null) => {
    const [requests, setRequests] = useState([]);
    const [requestTypes, setRequestTypes] = useState([]);
    const [loading, setLoading] = useState(false); // Unified loading state
    const [error, setError] = useState(null);
    const { showToast } = useToast();

    // Fetch only request types
    const fetchRequestTypes = useCallback(async () => {
        setLoading(true); // Start loading
        setError(null);

        try {
            const typesData = await requestService.getRequestTypes();
            setRequestTypes(typesData);
        } catch (err) {
            console.error("Error fetching request types:", err);
            setError(err.message || "Failed to fetch request types");
            showToast("error", "Échec du chargement des types de demandes");
        } finally {
            setLoading(false); // End loading, regardless of success or failure
        }
    }, [showToast]);

    // Fetch all requests or requests for a specific employee
    const fetchRequests = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            // Fetch request types (moved here to ensure they are always fetched)
            const typesData = await requestService.getRequestTypes();
            setRequestTypes(typesData);

            let data;
            if (employeeMode && matricule) {
                data = await requestService.getEmployeeRequests(matricule);
            } else {
                data = await requestService.getAllRequests();
            }

            setRequests(data);
        } catch (err) {
            console.error("Error fetching requests:", err);
            setError(err.message || "Failed to fetch requests");
            showToast("error", "Échec du chargement des demandes");
        } finally {
            setLoading(false);
        }
    }, [employeeMode, matricule, showToast]);

    const createRequest = useCallback(
        async (request) => {
            try {
                await requestService.createRequest(request);
                showToast("success", "Demande créée avec succès");
                await fetchRequests();
                return true;
            } catch (err) {
                console.error("Error creating request:", err);
                showToast("error", `Échec de la création de la demande: ${err.message}`);
                return false;
            }
        },
        [fetchRequests, showToast]
    );

    const updateRequest = useCallback(
        async (id, request) => {
            try {
                await requestService.updateRequest(id, request);
                showToast("success", "Demande mise à jour avec succès");
                await fetchRequests();
                return true;
            } catch (err) {
                console.error("Error updating request:", err);
                showToast("error", `Échec de la mise à jour de la demande: ${err.message}`);
                return false;
            }
        },
        [fetchRequests, showToast]
    );

    const deleteRequest = useCallback(
        async (id) => {
            try {
                await requestService.deleteRequest(id);
                showToast("success", "Demande supprimée avec succès");
                await fetchRequests();
                return true;
            } catch (err) {
                console.error("Error deleting request:", err);
                showToast("error", `Échec de la suppression de la demande: ${err.message}`);
                return false;
            }
        },
        [fetchRequests, showToast]
    );

    return {
        requests,
        requestTypes,
        loading,
        error,
        fetchRequests,
        fetchRequestTypes,
        createRequest,
        updateRequest,
        deleteRequest,
    };
};
