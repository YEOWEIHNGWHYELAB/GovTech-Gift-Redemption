import React from 'react';
import { Button as MUIButton } from "@mui/material";
import RequestGift from "../../Hooks/RequestGift";

const GiftRedemptionPage: React.FC = () => {
    const { redeemGiftMtd, checkGiftRedemption } =
        RequestGift({
            resourceLabel: "Gift",
        });
    
    return (
        <div>
            <h1>Gift Redemption</h1>

            <div>
                <MUIButton
                    style={{
                        border: "2px solid #ff0000",
                        margin: "2px",
                        borderRadius: "4px",
                        padding: "8px",
                        width: "100%",
                        boxSizing: "border-box",
                        fontSize: "16px",
                    }}
                    onClick={() => {
                        checkGiftRedemption();
                    }}
                >
                    CHECK FOR GIFT REDEMPTION
                </MUIButton>
            </div>

            <br/>
            <br/>
            <br/>

            <div>
                <MUIButton
                    style={{
                        border: "2px solid #00ff00",
                        margin: "2px",
                        borderRadius: "4px",
                        padding: "8px",
                        width: "100%",
                        boxSizing: "border-box",
                        fontSize: "16px",
                    }}
                    onClick={() => {
                        redeemGiftMtd();
                    }}
                >
                    EXECUTE REDEMPTION
                </MUIButton>
            </div>
        </div>
    );
};

export default GiftRedemptionPage;
