"use client"
import { useEmployeeContext } from "../../context/employe-context"

const EmployeeTable = ({ employees, onEdit }) => {
    const { deleteEmployee } = useEmployeeContext()

    const handleDelete = async (matricule) => {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet employé ?")
        if (confirmed) {
            await deleteEmployee(matricule)
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return "N/A"
        return new Date(dateString).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    return (
        <div className="shadow-lg rounded-lg overflow-hidden bg-white">
            <div className="px-6 py-4 border-b bg-blue-100">
                <h2 className="text-xl font-semibold text-gray-700">Liste des Employes</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-green-200 text-gray-600 uppercase text-sm leading-normal">
                            {["Matricule", "Nom", "Prenom", "Email", "Date d'Embauche", "Role", "Departement", "Actions"].map(
                                (header) => (
                                    <th key={header} className="py-3 px-6 text-left font-medium">
                                        {header}
                                    </th>
                                ),
                            )}
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {employees.length > 0 ? (
                            employees.map((employee) => (
                                <tr key={employee.matricule} className="even:bg-slate-100 hover:bg-yellow-100 transition-colors">
                                    <td className="py-3 px-6">{employee.matricule}</td>
                                    <td className="py-3 px-6">{employee.nom}</td>
                                    <td className="py-3 px-6">{employee.prenom}</td>
                                    <td className="py-3 px-6">{employee.email}</td>
                                    <td className="py-3 px-6">{formatDate(employee.dateEmbauche)}</td>
                                    <td className="py-3 px-6">
                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-200 text-blue-700">
                                            {employee.role ? employee.role.nomRole : "Non defini"}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6">
                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-300 text-green-700">
                                            {employee.departement && employee.departement.nomDepartement
                                                ? employee.departement.nomDepartement
                                                : employee.departement && employee.departement.nom
                                                    ? employee.departement.nom
                                                    : employee.idDepartement
                                                        ? `ID: ${employee.idDepartement}`
                                                        : "Non defini"}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 flex space-x-2">
                                        <button
                                            onClick={() => onEdit(employee)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors duration-200"
                                            aria-label="Modifier l'employé"
                                        >
                                            {/* Edit Icon */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(employee.matricule)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors duration-200"
                                            aria-label="Supprimer l'employé"
                                        >
                                            {/* Delete Icon */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                                <line x1="14" y1="11" x2="14" y1={17}></line>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="py-3 px-6 text-center text-gray-500">
                                    Aucun employé trouve.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EmployeeTable
