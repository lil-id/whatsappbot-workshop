const fs = require('fs');
const path = require('path');

const dosen = async (client, message) => {
    const chat = await client.getChatById(message.from);
    await chat.sendSeen();
    await chat.sendStateTyping();

    // read the full path of JSON file
    const fullPath = path.resolve("../student-assistant/src/db/database.json");
    
    // read the JSON file
    fs.readFile(fullPath, 'utf8', async (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }
        try {
            // Parse the JSON data
            const jsonData = JSON.parse(data);

            // Let's look at the data
            // console.log("JSON Data:", jsonData);

            // Let's look at the dosen data
            // jsonData.dosen.map((item) => {
            //     console.log("ID:", item.id);
            //     console.log("Dosen:", item.name);
            //     console.log("NIP:", item.nip);
            //     console.log("Email:", item.email);
            //     console.log("Matkul:", item.matkul);
            // });

            // Format the message
            let formattedMessage = `Dosen Pengampu:\n\n`;

            // Loop through the dosen data
            jsonData.dosen.map((item) => {
                return (
                    formattedMessage += `# *ID*: ${item.id}\n`,
                    formattedMessage += `👤 *Dosen*: ${item.nama}\n`,
                    formattedMessage += `🎖 *NIP*: ${item.nip}\n`,
                    formattedMessage += `📧 *Email*: ${item.email}\n`,
                    formattedMessage += `📖 *Matkul*: ${item.matkul}\n\n`);
                });

            // Send the message to the user
            await message.reply(formattedMessage);

        } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
        }
    });
}

module.exports = { dosen };