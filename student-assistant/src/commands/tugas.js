const fs = require("fs");
const path = require("path");

const tugas = async (client, message) => {
    const chat = await client.getChatById(message.from);
    await chat.sendSeen();
    await chat.sendStateTyping();

    // read the full path of JSON file
    const fullPath = path.resolve("../student-assistant/src/db/database.json");

    // read the JSON file
    fs.readFile(fullPath, "utf8", async (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }
        try {
            // Parse the JSON data
            const jsonData = JSON.parse(data);

            // // Let's look at the data
            // console.log("JSON Data:", jsonData);

            // // Let's look at the tugas data
            // jsonData.tugas.map((item) => {
            //     console.log("ID:", item.id);
            //     console.log("Dosen:", item.dosen_id);
            //     console.log("Judul:", item.judul);
            //     console.log("Deskripsi:", item.deskripsi);
            //     console.log("Deadline:", item.deadline);
            // });

            const tugasWithDosen = jsonData.tugas.map((tugasItem) => {
                // Find the corresponding dosen by dosen_id
                const dosenItem = jsonData.dosen.find((dosen) => dosen.id === tugasItem.dosen_id);

                // Return the tugas item with the dosen name included
                return {
                    ...tugasItem,
                    nama_dosen: dosenItem ? dosenItem.nama : "Unknown Dosen", // Fallback if no match is found
                };
            });

            // Format the message
            let formattedMessage = `Tugas Kuliah:\n\n`;

            // Loop through the tugas data
            tugasWithDosen.forEach((item) => {
                formattedMessage += `# *ID*: ${item.id}\n`,
                formattedMessage += `👤 *Dosen*: ${item.nama_dosen}\n`,
                formattedMessage += `🔖 *Judul*: ${item.judul}\n`,
                formattedMessage += `📍 *Deskripsi*: ${item.deskripsi}\n`,
                formattedMessage += `🗓 *Deadline*: ${item.deadline}\n\n`;
            });

            // Send the message to the user
            await message.reply(formattedMessage);
        } catch (parseError) {
            console.error("Error parsing JSON:", parseError);
        }
    });
};

module.exports = { tugas };
