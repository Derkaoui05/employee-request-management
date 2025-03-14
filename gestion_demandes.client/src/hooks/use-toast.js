
import { useState, useCallback } from "react"

// Simple toast notification hook
export const useToast = () => {
    const [toast, setToast] = useState({ visible: false, message: "", type: "info" })

    const showToast = useCallback((type, message) => {
        setToast({ visible: true, message, type })

        // Auto-hide toast after 3 seconds
        setTimeout(() => {
            setToast((prev) => ({ ...prev, visible: false }))
        }, 3000)
    }, [])

    const hideToast = useCallback(() => {
        setToast((prev) => ({ ...prev, visible: false }))
    }, [])

    return { toast, showToast, hideToast }
}