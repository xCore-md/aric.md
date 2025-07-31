import React from "react";
import { apiInstance } from "@/utils/api";

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

    return { isLoading, isAuthenticated };
}
