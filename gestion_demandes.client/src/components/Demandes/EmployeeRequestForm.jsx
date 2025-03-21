import { useState, useEffect, useCallback } from "react";
import { useEmployeeContext } from "../../context/employe-context";
import { useRequests } from "../../hooks/use-request";
import { employeeService } from "../../services/EmployeService";
import { Toast } from "../../ui/Toast";
import { useToast } from "../../hooks/use-toast";

export default function EmployeeRequestForm() {
    const { employees, loading: loadingEmployees, fetchEmployees } = useEmployeeContext();
    const { requestTypes, loading: loadingRequestTypes, error: requestTypesError, fetchRequestTypes, createRequest } = useRequests();
    const { toast, showToast, hideToast } = useToast();

    const [formData, setFormData] = useState({
        matricule: "",
        idType: "",
        dateDebut: "",
        dateFin: "",
        details: "",
        soldeConge: 0,
        duree: 0,
    });

    const [loadingBalance, setLoadingBalance] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        if (employees.length === 0) {
            fetchEmployees();
        }
        fetchRequestTypes();
    }, [fetchEmployees, fetchRequestTypes, employees.length]);

    const validateForm = useCallback(() => {
        const errors = {};

        if (!formData.matricule) errors.matricule = "Veuillez sélectionner un employé";
        if (!formData.idType) errors.idType = "Veuillez sélectionner un type de demande";
        if (!formData.dateDebut) errors.dateDebut = "La date de début est requise";
        if (!formData.dateFin) errors.dateFin = "La date de fin est requise";

        if (formData.dateDebut && formData.dateFin) {
            const start = new Date(formData.dateDebut);
            const end = new Date(formData.dateFin);
            if (end < start) {
                errors.dateFin = "La date de fin doit être après la date de début";
            }
        }

        const isLeaveRequest = requestTypes.some(
            (type) =>
                type.idType.toString() === formData.idType.toString() &&
                type.nomType.toLowerCase().includes("congé")
        );

        if (isLeaveRequest && formData.duree > formData.soldeConge) {
            errors.duree = "La durée demandée dépasse votre solde de congés disponible";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }, [formData, requestTypes]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        let updatedForm = { ...formData, [name]: value };

        if (formErrors[name]) {
            setFormErrors((prev) => ({ ...prev, [name]: null }));
        }

        if (name === "matricule" && value) {
            setLoadingBalance(true);
            try {
                const matriculeNumber = parseInt(value, 10);
                const soldeResponse = await employeeService.getLeaveBalance(matriculeNumber);
                updatedForm.soldeConge = soldeResponse.soldeConge || 0;
            } catch (error) {
                console.error("Erreur lors de la récupération du solde de congés:", error);
                updatedForm.soldeConge = 0;
                showToast("error", "Impossible de récupérer le solde de congés");
            } finally {
                setLoadingBalance(false);
            }
        }

        if ((name === "dateDebut" || name === "dateFin") && updatedForm.dateDebut && updatedForm.dateFin) {
            const start = new Date(updatedForm.dateDebut);
            const end = new Date(updatedForm.dateFin);

            if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
                const duration = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
                updatedForm.duree = duration > 0 ? duration : 0;
            }
        }

        setFormData(updatedForm);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            showToast("error", "Veuillez corriger les erreurs dans le formulaire");
            return;
        }

        setSubmitting(true);

        try {
            const requestData = {
                matricule: parseInt(formData.matricule, 10),
                idType: parseInt(formData.idType, 10),
                dateDebut: new Date(formData.dateDebut).toISOString(),
                dateFin: new Date(formData.dateFin).toISOString(),
                details: formData.details || "",
                statut: "En attente",
            };

            console.log("Données envoyées:", requestData);

            await createRequest(requestData);

            setFormData({
                matricule: "",
                idType: "",
                dateDebut: "",
                dateFin: "",
                details: "",
                soldeConge: 0,
                duree: 0,
            });

            showToast("success", "Demande soumise avec succès");
        } catch (error) {
            console.error("Erreur lors de la soumission:", error);
            showToast("error", "Erreur lors de la soumission de la demande");
        } finally {
            setSubmitting(false);
        }
    };

    const handleReset = () => {
        setFormData({
            matricule: "",
            idType: "",
            dateDebut: "",
            dateFin: "",
            details: "",
            soldeConge: 0,
            duree: 0,
        });
        setFormErrors({});
        setFormSubmitted(false);
    };

    return (
        <div className="flex items-center justify-center p-6">
            <div className="w-full max-w-2xl">
                <div className="bg-white shadow-2xl rounded-3xl p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
                        Formulaire de Demande
                    </h2>

                    {(loadingEmployees || loadingRequestTypes) && (
                        <div className="flex justify-center items-center my-6 space-x-2">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                            <span className="text-gray-700">Chargement des donnees...</span>
                        </div>
                    )}

                    {requestTypesError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                            <p className="font-bold">Erreur</p>
                            <p>{requestTypesError}</p>
                        </div>
                    )}

                    {!loadingEmployees && employees.length === 0 && (
                        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg mb-6">
                            <p className="font-bold">Attention</p>
                            <p>Aucun employe n'est disponible. Veuillez ajouter des employes avant de creer une demande.</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Employee Selection */}
                        <div>
                            <label htmlFor="matricule" className="block text-sm font-medium text-gray-700 mb-2">
                                Employe <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="matricule"
                                name="matricule"
                                value={formData.matricule}
                                onChange={handleChange}
                                disabled={submitting || loadingEmployees || employees.length === 0}
                                className={`w-full p-3 bg-gray-50 border ${formErrors.matricule && formSubmitted ? "border-red-500" : "border-gray-300"
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            >
                                <option value="">Selectionner un employe</option>
                                {employees.map((emp) => (
                                    <option key={emp.matricule} value={emp.matricule}>
                                        {emp.matricule} - {emp.nom} {emp.prenom}
                                    </option>
                                ))}
                            </select>
                            {formErrors.matricule && formSubmitted && (
                                <p className="mt-2 text-sm text-red-500">{formErrors.matricule}</p>
                            )}
                        </div>

                        {/* Request Type Selection */}
                        <div>
                            <label htmlFor="idType" className="block text-sm font-medium text-gray-700 mb-2">
                                Type de Demande <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="idType"
                                name="idType"
                                value={formData.idType}
                                onChange={handleChange}
                                disabled={submitting || loadingRequestTypes}
                                className={`w-full p-3 bg-gray-50 border ${formErrors.idType && formSubmitted ? "border-red-500" : "border-gray-300"
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            >
                                <option value="">Selectionner un type de demande</option>
                                {requestTypes.map((type) => (
                                    <option key={type.idType} value={type.idType}>
                                        {type.nomType}
                                    </option>
                                ))}
                            </select>
                            {formErrors.idType && formSubmitted && (
                                <p className="mt-2 text-sm text-red-500">{formErrors.idType}</p>
                            )}
                        </div>

                        {/* Date Range */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700 mb-2">
                                    Date de Debut <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="dateDebut"
                                    type="datetime-local"
                                    name="dateDebut"
                                    value={formData.dateDebut}
                                    onChange={handleChange}
                                    disabled={submitting}
                                    className={`w-full p-3 bg-gray-50 border ${formErrors.dateDebut && formSubmitted ? "border-red-500" : "border-gray-300"
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                />
                                {formErrors.dateDebut && formSubmitted && (
                                    <p className="mt-2 text-sm text-red-500">{formErrors.dateDebut}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700 mb-2">
                                    Date de Fin <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="dateFin"
                                    type="datetime-local"
                                    name="dateFin"
                                    value={formData.dateFin}
                                    onChange={handleChange}
                                    disabled={submitting}
                                    className={`w-full p-3 bg-gray-50 border ${formErrors.dateFin && formSubmitted ? "border-red-500" : "border-gray-300"
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                />
                                {formErrors.dateFin && formSubmitted && (
                                    <p className="mt-2 text-sm text-red-500">{formErrors.dateFin}</p>
                                )}
                            </div>
                        </div>

                        {/* Details */}
                        <div>
                            <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-2">
                                Details de la Demande
                            </label>
                            <textarea
                                id="details"
                                name="details"
                                placeholder="Fournissez des détails sur votre demande..."
                                value={formData.details}
                                onChange={handleChange}
                                disabled={submitting}
                                rows="4"
                                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            ></textarea>
                        </div>

                        {/* Duration and Leave Balance */}
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
                                <div className="text-gray-700">
                                    <span className="font-medium">Duree:</span>
                                    <span className={`font-semibold ml-1 ${formErrors.duree && formSubmitted ? "text-red-500" : "text-blue-800"
                                        }`}>
                                        {formData.duree}
                                    </span> jours
                                    {formErrors.duree && formSubmitted && (
                                        <p className="text-sm text-red-500 mt-1">{formErrors.duree}</p>
                                    )}
                                </div>
                                <div className="text-gray-700">
                                    <span className="font-medium">Solde de Conges:</span>
                                    {loadingBalance ? (
                                        <span className="ml-2 inline-block w-4 h-4 border-t-2 border-blue-600 rounded-full animate-spin"></span>
                                    ) : (
                                        <span className="font-semibold ml-1 text-green-700">{formData.soldeConge}</span>
                                    )} jours
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={handleReset}
                                disabled={submitting}
                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                            >
                                Reinitialiser
                            </button>
                            <button
                                type="submit"
                                disabled={submitting || loadingEmployees || loadingRequestTypes}
                                className={`px-6 py-2 rounded-lg text-white ${submitting || loadingEmployees || loadingRequestTypes
                                        ? "bg-blue-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700"
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                            >
                                {submitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Soumission...
                                    </span>
                                ) : (
                                    "Soumettre la Demande"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Toast Notification */}
            <Toast visible={toast.visible} message={toast.message} type={toast.type} onClose={hideToast} />
        </div>
    );
}