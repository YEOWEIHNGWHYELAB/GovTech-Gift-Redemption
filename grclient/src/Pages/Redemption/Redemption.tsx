import React, { useState } from 'react';
import { Button as MUIButton } from "@mui/material";
import RequestGift from "../../Hooks/RequestGift";

const GiftRedemptionPage: React.FC = () => {
    const { canRedeem, redeemGiftMtd, checkGiftRedemption, error } =
        RequestGift({
            resourceLabel: "Gift",
        });

    const redeemGift = () => {
            if (canRedeem) {
            // You can add your redemption logic here.
            // For this example, we'll just show an alert.
            alert('Gift redeemed successfully!');
            } else {
            alert('You cannot redeem the gift at this time.');
            }
    };

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
                        width: "25%",
                        boxSizing: "border-box",
                    }}
                    onClick={() => {
                        checkGiftRedemption(() => {});
                    }}
                >
                    CHECK FOR GIFT REDEMPTION
                </MUIButton>
            </div>
        </div>
    );
};

export default GiftRedemptionPage;
