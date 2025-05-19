const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { dosen } = require("./src/commands/dosen");
const { jadwal } = require("./src/commands/jadwal");
const { help } = require("./src/commands/help");
const { tugas } = require("./src/commands/tugas");

// This is the path to the session data file
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
});

const listCommands = {
	"!jadwal": jadwal,
	"!dosen": dosen,
	"!tugas": tugas,
	"!help": help,
}

// This will be displayed in the terminal
client.once("ready", () => {
    console.log("Client is ready!");
});

// Generate and display QR code for authentication
client.on("qr", (qr) => {
    console.log("Scan the QR code to log in:");
    qrcode.generate(qr, { small: true });
});

// // Listening to all incoming messages
// client.on("message_create", (message) => {
//     console.log(message.body);
// });

// client.on("message_create", (message) => {
//     if (message.body === "!ping") {
//         // send back "pong" to the chat the message was sent in
//         client.sendMessage(message.from, "pong");
//     }
// });

// client.on("message_create", (message) => {
//     if (message.body === "!ping") {
//         // reply back "pong" directly to the message
//         message.reply("pong");
//     }
// });

client.on("message_create", async (message) => {
	// Ensure message.body is a string
	if (typeof message.body !== "string") return;

    // Check if there's at least one line and it starts with "!"
    if (message.body.length === 0 || !message.body[0].startsWith("!")) return;

	// Convert the first line to lowercase
	const command = message.body.toLowerCase();

	// Check if the command exists in the list
	const selectedCommand = listCommands[command];

	// If the command exists, execute it
	if (selectedCommand) {
		await selectedCommand(client, message);
	}
});

client.initialize();
