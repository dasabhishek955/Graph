import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Home() {
    const [file, setFile] = useState();
    let navigate = useNavigate();

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    const handleUpload = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        axios.post('http://localhost:5000/upload', formData)
            .then((response) => {
                console.log(response.data)
                // Show a success message to the user
                navigate("/display");
            })
            .catch((error) => {
                console.error(error.response.data);
                // Show an error message to the user
            });
    };

    return (
        <center><div className="row g- align-items-center my-3 ">
            <input type='file' onChange={onFileChange} />
            <button className="button-85 my-5 mx-5" onClick={handleUpload}>Upload</button>
        </div></center>
    );
}

export default Home

