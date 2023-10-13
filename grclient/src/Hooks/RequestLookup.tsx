import { useCallback, useState, useContext } from "react";
import axios from "axios";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { LoadingOverlayResourceContext } from "../Contexts/LoadingOverlayResource";
import SetHeaderToken from "../Contexts/SetHeaderToken";
import HTTPAPIError from "../Errors/HTTPAPIERROR";


export default function RequestLookup({ resourceLabel } : { resourceLabel : any }) {
    const [resourceList, setResourceList] = useState({
        results: []
    });
    const [error, setError] = useState<any>(null);

    const loadingOverlay = useContext(LoadingOverlayResourceContext);
    const { enqueueSnackbar } = useSnackbar();
    const { setLoading } = loadingOverlay;
    
    const handleRequestResourceError = useCallback((err : any) => {
        const formattedError = HTTPAPIError(err);
        setError(formattedError);
        setLoading(false);
        enqueueSnackbar(formattedError);
        window.location.href = '/auth/login';
    }, [enqueueSnackbar, setError, setLoading]);

    const lookupTeams = useCallback(() => {
        setLoading(true);

        axios.get(`/lookup/teamnameall`, SetHeaderToken())
            .then((res) => {
                setLoading(false);

                setResourceList({
                    results: res.data
                });
            }).catch(handleRequestResourceError);
    }, [handleRequestResourceError, setLoading]);

    const addTeam = useCallback(() => {
        setLoading(true);

        axios.post(`/lookup/addteamname`, {}, SetHeaderToken())
            .then((res) => {
                setLoading(false);

                if (res.data) {
                    alert(res.data);

                    if (res.data === "Your team have already redeemed") {
                        enqueueSnackbar(`${resourceLabel} already claimed`);
                    } else {
                        enqueueSnackbar(`${resourceLabel} claimed`);
                    }
                }
                
            }).catch(handleRequestResourceError);
    }, [enqueueSnackbar, resourceLabel, handleRequestResourceError, setLoading]);

    const joinTeam = useCallback(() => {
        setLoading(true);

        axios.post(`/lookup/jointeamname`, {}, SetHeaderToken())
            .then((res) => {
                setLoading(false);

                if (res.data) {
                    alert(res.data);

                    if (res.data === "Your team have already redeemed") {
                        enqueueSnackbar(`${resourceLabel} already claimed`);
                    } else {
                        enqueueSnackbar(`${resourceLabel} claimed`);
                    }
                }
                
            }).catch(handleRequestResourceError);
    }, [enqueueSnackbar, resourceLabel, handleRequestResourceError, setLoading]);

    return {
        resourceList,
        lookupTeams,
        addTeam,
        joinTeam,
        error
    }
}