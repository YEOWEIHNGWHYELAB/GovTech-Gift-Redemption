import { useCallback, useState, useContext } from "react";
import axios from "axios";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { LoadingOverlayResourceContext } from "../Contexts/LoadingOverlayResource";
import SetHeaderToken from "../Contexts/SetHeaderToken";
import HTTPAPIError from "../Errors/HTTPAPIERROR";


export default function RequestGift({ resourceLabel } : { resourceLabel : any }) {
    const [canRedeem, setCanRedeem] = useState<Boolean>(false);
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

    // Callback lets us recreate function when dependencies created 
    const checkGiftRedemption = useCallback(() => {
        setLoading(true);

        axios.get(`/redemption/verify`, SetHeaderToken())
            .then((res) => {
                setLoading(false);

                if (res.data) {
                    setCanRedeem(res.data.can_redeem);
                    
                    if (res.data.can_redeem) {
                        alert("You can redeem!");
                    } else {
                        alert("You cannot redeem!");
                    }   
                }
            }).catch(handleRequestResourceError);
    }, [handleRequestResourceError, setLoading]);

    const redeemGiftMtd = useCallback(() => {
        setLoading(true);

        axios.post(`/redemption/redeem`, {}, SetHeaderToken())
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
        canRedeem,
        redeemGiftMtd,
        checkGiftRedemption,
        error
    }
}