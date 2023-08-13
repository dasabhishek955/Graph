import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
ChartJS.register(BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement)


const Display = () => {
    const [values, setValues] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/get_values')
            .then((response) => {
                setValues(response.data);
            })
            .catch((error) => {
                console.error(error.response.data);
            });
    }, []);

    // Prepare data for the bar graph
    const barData = {
        labels: values.map((value, index) => `Value ${index + 1}`),
        datasets: [
            {
                label: 'Integer Values',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    }

    // Prepare data for the line graph
    const lineData = {
        labels: values.map((value, index) => `Value ${index + 1}`),
        datasets: [
            {
                label: 'Integer Values',
                data: values,
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.4,
                pointStyle: 'transparent'
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
        legend: {
            labels: {
                frontSize: 15,
            },
        },
        animation: {
            duration: 1000, // Set the duration of the animation in milliseconds
            easing: 'easeInOutQuart', // Set the easing function for the animation (e.g., linear, easeInOutQuad, easeInOutQuart)
        },
        onClick: (_, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                const selectedValue = values[index];
                alert(`You clicked on Value ${index + 1}: ${selectedValue}`);
            }
        }
    }

    return (
        <div>
            <ul>
                <h1>{values.map((value) => (
                    <li key={value}>the values are: {value}</li>
                ))}</h1>
            </ul>
            <center><div style={{ display: 'flex', justifyContent: 'space-around', maxWidth: "600px" }}>
                <Bar data={barData} height={400} options={options} />
                <Line data={lineData} height={400} options={options} />
            </div></center>
        </div>
    )
}

export default Display