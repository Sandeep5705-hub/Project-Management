const axios = require('axios');

async function reproduce() {
    const api = axios.create({
        baseURL: 'http://localhost:5000/api'
    });

    try {
        console.log('--- ATTEMPTING QUICK SUBMIT REPRO ---');
        // We simulate a basic project and user
        const res = await api.post('/tasks/quick-submit', {
            projectId: '69d531de16a6a89ad5c60da8', // Existing project from logs
            title: 'Code Submission',
            category: 'Development',
            githubLink: 'https://github.com/Sandeep5705-hub',
            fileName: ''
        }, {
            headers: {
                // We'll use a hardcoded token or just try without it to see if it's an auth error
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` // (Requires a real token)
            }
        });
        console.log('SUCCESS:', res.data);
    } catch (err) {
        console.error('FAILED! Status:', err.response?.status);
        console.error('Error Details:', err.response?.data);
    }
}

reproduce();
