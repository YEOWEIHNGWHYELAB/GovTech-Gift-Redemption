import { useCallback, useState, useContext } from "react";
import axios from "axios";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { LoadingOverlayResourceContext } from "../Contexts/LoadingOverlayResource";
import SetHeaderToken from "../Contexts/SetHeaderToken";
import HTTPAPIError from "../Errors/HTTPAPIERROR";


export default function RequestLookup({ resourceLabel } : { resourceLabel : any }) {
    const [resourceList, setResourceList] = useState<{ results: string[] }>({
        results: []
    });
    const [error, setError] = useState<any>(null);
    const [myTeam, setMyTeam] = useState<string>("");

    const loadingOverlay = useContext(LoadingOverlayResourceContext);
    const { enqueueSnackbar } = useSnackbar();
    const { setLoading } = loadingOverlay;
    
    const handleRequestResourceError = useCallback((err : any) => {
        const formattedError = HTTPAPIError(err);
        setError(formattedError);
        setLoading(false);
        enqueueSnackbar(formattedError);
        localStorage.removeItem("JWTToken");
        window.location.href = '/auth/login';
    }, [enqueueSnackbar, setError, setLoading]);

    const lookupMyTeam = useCallback((callback : any) => {
        setLoading(true);

        axios.get(`/lookup/teamname`, SetHeaderToken())
            .then((res) => {
                setLoading(false);

                if (res.data) {
                    setMyTeam(res.data.team_name);
                }

                if (callback) {
                    callback();
                }
            }).catch(handleRequestResourceError);
    }, [handleRequestResourceError, setLoading]);

    const lookupTeams = useCallback((callback : any) => {
        setLoading(true);

        axios.get(`/lookup/teamnameall`, SetHeaderToken())
            .then((res) => {
                setLoading(false);

                setResourceList({
                    results: res.data
                });

                if (callback) {
                    callback();
                }
            }).catch(handleRequestResourceError);
    }, [handleRequestResourceError, setLoading]);

    const addTeam = useCallback((teamname : string) => {
        setLoading(true);

        axios.post(`/lookup/addteamname`, {team_name: teamname}, SetHeaderToken())
            .then((res) => {
                setLoading(false);

                if (res.data) {
                    alert(res.data);

                    if (res.data === "Teamname already exist or Server Error") {
                        enqueueSnackbar(`${resourceLabel} already exist`);
                    } else {
                        enqueueSnackbar(`${resourceLabel} added`);
                        setResourceList({
                            results: [...resourceList.results, teamname]
                        });
                    }
                }
            }).catch(handleRequestResourceError);
    }, [setLoading, handleRequestResourceError, resourceList.results, enqueueSnackbar, resourceLabel]);

    const joinTeam = useCallback((teamname : string) => {
        setLoading(true);

        axios.post(`/lookup/jointeamname`, {team_name: teamname}, SetHeaderToken())
            .then((res) => {
                setLoading(false);

                if (res.data) {
                    alert(res.data);

                    if (res.data === "You are already on a team or you have already joined this team, please contact your admin in order leave your team first") {
                        enqueueSnackbar(`Already on the ${resourceLabel} `);
                    } else {
                        enqueueSnackbar(`${resourceLabel} joined`);
                    }
                }
                
            }).catch(handleRequestResourceError);
    }, [enqueueSnackbar, resourceLabel, handleRequestResourceError, setLoading]);

    return {
        resourceList,
        myTeam,
        lookupMyTeam,
        lookupTeams,
        addTeam,
        joinTeam,
        error
    }
}