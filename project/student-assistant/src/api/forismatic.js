const axios = require('axios');

const getQuote = async () => {
    try {
        const response = await axios.get('https://api.forismatic.com/api/1.0/', {
            params: {
                method: 'getQuote',
                format: 'json',
                lang: 'en'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching quote:', error);
        throw error;
    }
}

module.exports = { getQuote };