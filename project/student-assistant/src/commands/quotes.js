const { getQuote } = require("../api/forismatic");

const quotes = async (client, message) => {
    const chat = await client.getChatById(message.from);
    await chat.sendSeen();
    await chat.sendStateTyping();

    try {
        // Get the quote from the API
        const quote = await getQuote();

        const quoteText = quote.quoteText
        const quoteAuthor = quote.quoteAuthor

        // Remove whitespace at the beginning and end of the quote
        const trimQuote = quoteText.trim();
        const trimAuthor = quoteAuthor.trim();
        
        // Format the message
        let formattedMessage = `🌟 Quotes of the day 🌟\n\n`;
        formattedMessage += `_${trimQuote}_\n\n`,
        formattedMessage += `~ *${trimAuthor || 'Unknow'}*\n`,

        // Send the message to the user
        await message.reply(formattedMessage);
    } catch (error) {
        await message.reply("Sorry, I couldn't fetch a quote at the moment. Please try again later.");
        console.error("Couldn't fetch a quote at the moment.", error);
    }
}

module.exports = { quotes };