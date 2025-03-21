

import { useEffect, useState } from "react"
import { useFormData } from "../../hooks/use-form-data"
import { useReferenceData } from "../../hooks/use-reference-data"
import { useEmployeeContext } from "../../context/employe-context"

const EmployeeForm = ({ employee, onSave, onCancel }) => {
    const { addEmployee, updateEmployee } = useEmployeeContext()
    const { departments, roles, loading: loadingReferenceData } = useReferenceData()
    const [showPassword, setShowPassword] = useState(false)

    const initialData = {
        matricule: "",
        nom: "",
        prenom: "",
        email: "",
        motDePasse: "",
        dateEmbauche: new Date().toISOString().split("T")[0],
        idRole: "",
        idDepartement: "",
    }

    const handleSubmitForm = async (data) => {
        try {
            console.log("Form data to submit:", data)

            const success = employee ? await updateEmployee(data) : await addEmployee(data)

            if (success) {
                onSave()
            }
        } catch (error) {
            console.error("Error saving employee:", error)
        }
    }

    const { formData, setFormData, errors, isSubmitting, handleChange, handleSubmit } = useFormData(
        initialData,
        handleSubmitForm,
    )

    // Update form when employee changes
    useEffect(() => {
        if (employee) {
            setFormData({
                matricule: employee.matricule || "",
                nom: employee.nom || "",
                prenom: employee.prenom || "",
                email: employee.email || "",
                motDePasse: "",
                dateEmbauche: employee.dateEmbauche
                    ? employee.dateEmbauche.split("T")[0]
                    : new Date().toISOString().split("T")[0],
                idRole: employee.idRole || "",
                idDepartement: employee.idDepartement || "",
            })
        } else {
            setFormData(initialData)
        }
    }, [employee, setFormData])

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    if (loadingReferenceData) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
                <h2 className="text-2xl font-bold">{employee ? "Modifier l'employe" : "Ajouter un employe"}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="matricule" className="block text-sm font-medium text-gray-700 mb-1">
                            Matricule
                        </label>
                        <input
                            id="matricule"
                            type="number"
                            name="matricule"
                            value={formData.matricule}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md ${errors.matricule ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            disabled={!!employee}
                            required
                        />
                        {errors.matricule && <p className="mt-1 text-sm text-red-500">{errors.matricule}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            required
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                            Nom
                        </label>
                        <input
                            id="nom"
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md ${errors.nom ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            required
                        />
                        {errors.nom && <p className="mt-1 text-sm text-red-500">{errors.nom}</p>}
                    </div>

                    <div>
                        <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">
                            Prenom
                        </label>
                        <input
                            id="prenom"
                            type="text"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md ${errors.prenom ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            required
                        />
                        {errors.prenom && <p className="mt-1 text-sm text-red-500">{errors.prenom}</p>}
                    </div>

                    <div>
                        <label htmlFor="motDePasse" className="block text-sm font-medium text-gray-700 mb-1">
                            Mot de passe
                        </label>
                        <div className="relative">
                            <input
                                id="motDePasse"
                                type={showPassword ? "text" : "password"}
                                name="motDePasse"
                                value={formData.motDePasse}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-md ${errors.motDePasse ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                required={!employee}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    {showPassword ? (
                                        <path d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" />
                                    ) : (
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    )}
                                    <path
                                        fillRule="evenodd"
                                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                        {errors.motDePasse && <p className="mt-1 text-sm text-red-500">{errors.motDePasse}</p>}
                        {employee && (
                            <p className="mt-1 text-xs text-gray-500">Laissez vide pour conserver le mot de passe actuel.</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="dateEmbauche" className="block text-sm font-medium text-gray-700 mb-1">
                            Date d'embauche
                        </label>
                        <input
                            id="dateEmbauche"
                            type="date"
                            name="dateEmbauche"
                            value={formData.dateEmbauche}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="idRole" className="block text-sm font-medium text-gray-700 mb-1">
                            Role
                        </label>
                        <select
                            id="idRole"
                            name="idRole"
                            value={formData.idRole}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Selectionner un role</option>
                            {roles.map((role) => (
                                <option key={role.idRole} value={role.idRole}>
                                    {role.nomRole}
                                </option>
                            ))}
                        </select>
                        {errors.idRole && <p className="mt-1 text-sm text-red-500">{errors.idRole}</p>}
                    </div>

                    <div>
                        <label htmlFor="idDepartement" className="block text-sm font-medium text-gray-700 mb-1">
                            Departement
                        </label>
                        <select
                            id="idDepartement"
                            name="idDepartement"
                            value={formData.idDepartement}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Selectionner un departement</option>
                            {departments.map((dept) => (
                                <option key={dept.idDepartement} value={dept.idDepartement}>
                                    {dept.nomDepartement}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-4 py-2 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {isSubmitting ? "Enregistrement..." : employee ? "Mettre a jour" : "Ajouter"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EmployeeForm