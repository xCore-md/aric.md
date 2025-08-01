import React from "react";
import { apiInstance } from "@/utils/api";
import { AUTH_SUCCESS_EVENT } from "@/utils/constants";

export function useCustomerAuth() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    React.useEffect(() => {
        apiInstance
            .get("customer/profile")
            .json()
            .then(() => setIsAuthenticated(true))
            .catch(() => setIsAuthenticated(false))
            .finally(() => setIsLoading(false));
    }, []);

    React.useEffect(() => {
        const handleAuthSuccess = () => setIsAuthenticated(true);
        window.addEventListener(AUTH_SUCCESS_EVENT, handleAuthSuccess);

        return () => window.removeEventListener(AUTH_SUCCESS_EVENT, handleAuthSuccess);
    }, []);

    return { isLoading, isAuthenticated };
}
