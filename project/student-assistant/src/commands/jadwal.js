const fs = require("fs");
const path = require("path");

const jadwal = async (client, message) => {
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

            // // Let's look at the jadwal data
            // jsonData.jadwal.map((item) => {
            //     console.log("ID:", item.id);
            //     console.log("Dosen:", item.dosen_id);
            //     console.log("Hari:", item.hari);
            //     console.log("Mulai:", item.jam_mulai);
            //     console.log("Selesai:", item.jam_selesai);
            //     console.log("Ruangan:", item.ruangan);
            // });

            const jadwalWithDosen = jsonData.jadwal.map((jadwalItem) => {
                // Find the corresponding dosen by dosen_id
                const dosenItem = jsonData.dosen.find((dosen) => dosen.id === jadwalItem.dosen_id);
                const matkulItem = jsonData.mata_kuliah.find((matkul) => matkul.id === jadwalItem.matkul_id);
            
                // Return the jadwal item with the dosen name included
                return {
                    ...jadwalItem,
                    nama_matkul: matkulItem ? matkulItem.nama : "Unknown Mata Kuliah", // Fallback if no match is found
                    nama_dosen: dosenItem ? dosenItem.nama : "Unknown Dosen", // Fallback if no match is found
                };
            });

            // Format the message
            let formattedMessage = `Jadwal Mata Kuliah:\n\n`;

            // Loop through the dosen data
            jadwalWithDosen.forEach((item) => {
                formattedMessage += `# *ID*: ${item.id}\n`,
                formattedMessage += `📖 *Matkul*: ${item.nama_matkul}\n`
                formattedMessage += `🗓 *Hari*: ${item.hari}\n`,
                formattedMessage += `👤 *Dosen*: ${item.nama_dosen}\n`,
                formattedMessage += `⏰ *Mulai*: ${item.jam_mulai}\n`,
                formattedMessage += `📯 *Selesai*: ${item.jam_selesai}\n`,
                formattedMessage += `🏛 *Ruangan*: ${item.ruangan}\n\n`
            });

            // Send the message to the user
            await message.reply(formattedMessage);
        } catch (parseError) {
            console.error("Error parsing JSON:", parseError);
        }
    });
};

module.exports = { jadwal };
