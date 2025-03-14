import { config } from "../config"

const apiClient = async (endpoint, options = {}) => {
    try {
        console.log(`Calling API: ${config.API_BASE_URL}/${endpoint}`, options);

        const response = await fetch(`${config.API_BASE_URL}/${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            // Try to get detailed error message from response
            let errorMessage = `Error: ${response.status} ${response.statusText}`;
            let errorDetails = null;

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                try {
                    const errorData = await response.json();
                    console.error("Error response:", errorData);

                    if (errorData.error) {
                        errorMessage = errorData.error;
                        errorDetails = errorData.stackTrace;
                    } else if (errorData.title) {
                        errorMessage = errorData.title;
                    } else if (errorData.errors) {
                        // Handle validation errors
                        const validationErrors = Object.entries(errorData.errors)
                            .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
                            .join("; ");
                        errorMessage = validationErrors;
                    } else if (typeof errorData === "string") {
                        errorMessage = errorData;
                    }
                } catch (e) {
                    // If we can't parse the error as JSON, try to get text
                    console.warn("Could not parse error response as JSON, trying text");
                    const textError = await response.text();
                    if (textError) {
                        errorMessage = textError;
                    }
                }
            } else {
                // Try to get error as text
                try {
                    const textError = await response.text();
                    if (textError) {
                        errorMessage = textError;
                    }
                } catch (e) {
                    console.warn("Could not get error response as text");
                }
            }

            const error = new Error(errorMessage);
            error.status = response.status;
            error.details = errorDetails;
            throw error;
        }

        // For empty responses (like DELETE)
        if (response.status === 204) {
            return null;
        }

        return response.json();
    } catch (error) {
        console.error("API request failed:", error);
        throw error;
    }
};

export default apiClient;