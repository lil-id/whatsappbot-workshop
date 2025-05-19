const help = async (client, message) => {
    const chat = await client.getChatById(message.from);
    await chat.sendSeen();
    await chat.sendStateTyping();

    let helpMessage = "*Daftar Perintah*:\n\n";
    helpMessage += "`!jadwal` - Menampilkan jadwal kuliah\n";
    helpMessage += "`!dosen`- Info dosen pengampu\n";
    helpMessage += "`!tugas` - Deadline tugas yang akan datang\n";
    helpMessage += "`!help` - Daftar perintah yang tersedia\n";

    message.reply(helpMessage);
}

module.exports = { help };