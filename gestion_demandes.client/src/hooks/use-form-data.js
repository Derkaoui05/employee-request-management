import { useState, useCallback } from "react"

export const useFormData = (initialData, onSubmit) => {
    const [formData, setFormData] = useState(initialData)
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target
            setFormData((prev) => ({ ...prev, [name]: value }))

            // Clear error when field is edited
            if (errors[name]) {
                setErrors((prev) => ({ ...prev, [name]: null }))
            }
        },
        [errors],
    )

    const validateForm = useCallback(() => {
        const newErrors = {}

        // Add validation rules as needed
        if (!formData.matricule) newErrors.matricule = "Matricule est requis"
        if (!formData.nom) newErrors.nom = "Nom est requis"
        if (!formData.prenom) newErrors.prenom = "Prénom est requis"
        if (!formData.email) newErrors.email = "Email est requis"
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email est invalide"

        // Only validate password for new employees (when there's no employee.matricule)
        if (!formData.matricule && !formData.motDePasse) {
            newErrors.motDePasse = "Mot de passe est requis pour les nouveaux employés"
        }

        if (!formData.dateEmbauche) newErrors.dateEmbauche = "Date d'embauche est requise"
        if (!formData.idRole) newErrors.idRole = "Rôle est requis"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }, [formData])

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault()

            if (!validateForm()) return

            setIsSubmitting(true)
            try {
                await onSubmit(formData)
                // Form submission was successful
            } catch (error) {
                console.error("Form submission error:", error)
            } finally {
                setIsSubmitting(false)
            }
        },
        [formData, onSubmit, validateForm],
    )

    return {
        formData,
        setFormData,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
    }
}