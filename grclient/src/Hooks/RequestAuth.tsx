import { useCallback, useState, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../Contexts/AuthContextProvider";
import SetHeaderToken from "../Contexts/SetHeaderToken";
import formatHttpApiError from "../Errors/HTTPAPIERROR";
import { useSnackbar } from "notistack";

export default function useRequestAuth() {
    const [loading, setLoading] = useState(false);
    const [logoutPending, setLogoutPending] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [error, setError] = useState(null);
    const { setIsAuthenticated, setUser } = useContext(AuthContext);

    const handleRequestError = useCallback((err : any) => {
        const formattedError : any = formatHttpApiError(err);
        setError(formattedError);
        enqueueSnackbar(formattedError);
        setLoading(false);
    }, [enqueueSnackbar, setLoading, setError]);

    const resetPassword = useCallback((data : any) => {
        setLoading(true);
        
        axios.post("/auth/resetpwd", data, SetHeaderToken())
            .then(() => {
                enqueueSnackbar("Successfully updated password");
                setLoading(false);
            }).catch(handleRequestError);
    }, [enqueueSnackbar, handleRequestError]);

    const register = useCallback(({ username, email, password } : { username : any, email : any, password : any}, successCallback : any) => {
        setLoading(true);

        axios.post("/auth/register", { username, email, password })
            .then(() => {
                enqueueSnackbar("Sign up is successful, you can now sign in with your credentials");
                setLoading(false);
                if (successCallback) {
                    successCallback();
                }
            })
            .catch(handleRequestError);
    }, [enqueueSnackbar, handleRequestError, setLoading]);

    const login = useCallback(({ username, password } : { username : any, password : any}) => {
        setLoading(true);

        axios.post("/auth/login", { username, password })
            .then((res) => {
                const token = res.data.token;
                localStorage.setItem("JWTToken", token);
                setLoading(false);
                setIsAuthenticated(true);
            })
            .catch(handleRequestError);
    }, [handleRequestError, setLoading, setIsAuthenticated]);

    const forgotPasswordKickStart = useCallback((values : any) => {
        setLoading(true);

        axios.post("/auth/forgotpwd", values)
            .then((res) => {
                setLoading(false);
            })
            .catch(handleRequestError);
    }, [handleRequestError, setLoading, setIsAuthenticated]);

    const forgotPasswordConfirmation = useCallback((values : any, successCallback  : any) => {
        setLoading(true);

        axios.post("/auth/confirmforgotpwd", values)
            .then((res) => {
                setLoading(false);

                if (successCallback) {
                    successCallback();
                }
            })
            .catch(handleRequestError);
    }, [handleRequestError, setLoading, setIsAuthenticated]);

    // There is no communication with DB if you logout
    const logout = useCallback(() => {
        setLogoutPending(true);
        setIsAuthenticated(false);
        localStorage.removeItem("JWTToken");
        setLogoutPending(false);
    }, [handleRequestError, setLogoutPending, setIsAuthenticated]);

    return {
        register,
        login,
        logout,
        forgotPasswordKickStart,
        forgotPasswordConfirmation,
        logoutPending,
        loading,
        error,
        resetPassword
    };
}
