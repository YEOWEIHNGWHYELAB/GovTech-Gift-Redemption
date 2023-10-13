import React, {useState} from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import RequestLookup from "../../Hooks/RequestLookup";

const Lookup: React.FC = () => {
    const { resourceList, lookupTeams, addTeam, joinTeam, error } =
        RequestLookup({
            resourceLabel: "Teams",
        });
    
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
      
    const handleSubmit = () => {
        console.log('Submitted value:', inputValue);
    };
      
    return (
        <div>
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
        </div>
    );
};

export default Lookup;
