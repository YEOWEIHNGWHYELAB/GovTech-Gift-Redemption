import React, { useEffect, useState } from 'react';

import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import RequestLookup from "../../Hooks/RequestLookup";

const Lookup: React.FC = () => {
    const { resourceList, myTeam, lookupMyTeam, lookupTeams, addTeam, joinTeam, error } =
        RequestLookup({
            resourceLabel: "Teams",
        });

    const [selectedOption, setSelectedOption] = useState<string>("");

    useEffect(() => {
        lookupTeams(() => {
            lookupMyTeam(() => {
                setSelectedOption(myTeam);
            });
        });
    }, [myTeam]);
    
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
      
    const handleSubmit = () => {
        addTeam(inputValue);
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        setSelectedOption(event.target.value as string);
    };

    const handleSubmitTeam = () => {
        joinTeam(selectedOption);
    };
      
    return (
        <div>
            <h2>Add Team</h2>

            <TextField
                label="Enter a string"
                variant="outlined"
                fullWidth
                value={inputValue}
                onChange={handleInputChange}
            />

            <br/>
            <br/>

            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>

            <br/>
            <br/>

            <h2>Join Team</h2>

            <FormControl variant="outlined" fullWidth>
                <InputLabel>Select an option</InputLabel>
                <Select
                label="Select an option"
                value={selectedOption}
                onChange={handleSelectChange}
                >
                {resourceList.results.map((option, index) => (
                    <MenuItem key={index} value={option}>
                    {option}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            <br/>
            <br/>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitTeam}
                disabled={!selectedOption}
            >
                Submit
            </Button>
        </div>
    );
};

export default Lookup;
