const insertToDatabase = async () => {
    try {
        const response = await fetch(process.env.URL + '/api/insertData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log(result); // Check the response data
    } catch (error) {
        console.error('Error:', error);
    }
    
};

export default insertToDatabase;