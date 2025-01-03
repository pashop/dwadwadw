const Discord = require('discord.js-selfbot-v13');
const moment = require('moment');
const os = require('os');  // สำหรับดึงข้อมูล CPU และ RAM
const ping = require('ping');  // สำหรับดึงข้อมูล Ping

// List of user tokens, streaming URLs, and names for each client.
const userTokens = [
    'NzM4NzkxMDI1NjgxNzYwMjY3.GYdSti.35aXBUuRPJ7zglPrrIMVYg5mLLBE5og7LawWhk', // Replace with your token
];

const streamingUrls = [
    'https://www.twitch.tv/infytown',
];

const streamingNames = [
    'PASHOP',
];

const clients = [];

const change2 = [
    "มีบอทเจ๋งๆ ",
    "มีเม็ดม่วง",
    "แอดมินโคตรหล่อ",
    "Support เกือบ 25 ชั่วโมง",
];

const change3 = ["⏰", "⏰", "⏰", "⏰"];

class MyClient {
    constructor(token, name, url) {
        this.client = new Discord.Client({ readyStatus: false, checkUpdate: false });
        this.token = token;
        this.name = name;
        this.url = url;

        this.client.once('ready', () => {
            console.log(`Logged in as ${this.client.user.tag}`);

            this.updateRichPresence();

            // ตั้งค่าให้รีเฟรชทุก 500 มิลลิวินาที (0.5 วินาที)
            setInterval(() => {
                this.updateRichPresence();
            }, 500);  // Update every 0.5 second
        });

        this.client.login(this.token).catch(console.error);
    }

    async updateRichPresence() {
        const dwada = change2[Math.floor(Math.random() * change2.length)];
        const ap = change3[Math.floor(Math.random() * change3.length)];
        
        // ดึงข้อมูล CPU, RAM และ Ping
        const cpuUsage = os.cpus()[0].model;  // ข้อมูลเกี่ยวกับ CPU
        const totalMemory = os.totalmem() / 1024 / 1024 / 1024;  // RAM ทั้งหมด (GB)
        const freeMemory = os.freemem() / 1024 / 1024 / 1024;  // RAM ที่เหลือ (GB)

        // ใช้ ping module เพื่อดึงข้อมูล Ping
        const pingResult = await ping.promise.probe("google.com");
        const pingTime = pingResult.time;  // ค่า ping ที่ตอบกลับ

        const r = new Discord.RichPresence(this.client)
            .setApplicationId('738791025681760267') // Replace with your Application ID
            .setType('STREAMING')
            .setURL(this.url) // Must be Twitch or YouTube link
            .setState(`${dwada}`)
            .setName('PASHOP')
            .setDetails(`✎:･★ PASHOP 📅 [${moment().format("DD/MM/YYYY : HH:mm")}]•°• 🌐 CPU: ${cpuUsage} Ping: ${pingTime}ms♡*:･。. +ﾟ*｡:ﾟ+`)
            .setStartTimestamp(Date.now())
            .setAssetsLargeImage('https://cdn.discordapp.com/attachments/1069933895182725170/1324861998726381671/df54d411305571ca5d82371db65a97ea.gif?ex=6779b163&is=67785fe3&hm=89b8a003ea8427aa3912679548fa6c9997a5f5e9ec1bf373431bc990d7dfa328&') // Replace with the name of your uploaded image
            .setAssetsLargeText('PASHOP') // Hover text for the large image
            .setAssetsSmallImage('https://cdn.discordapp.com/attachments/1308803195673514046/1324803153337778247/1000038696-removebg-preview_1.png?ex=67797a95&is=67782915&hm=ab8f09b1d1da5c61d515147340e1178444981857f4d0050cdaf0bea369914248&') // Replace with the name of your uploaded image
            .setAssetsSmallText('pashop.online') // Hover text for the small image

        // Setting the presence with all details included
        this.client.user.setPresence({ activities: [r], status: 'online' });

        console.log(`Updated Rich Presence for ${this.client.user.tag}`);
    }
}

for (let i = 0; i < userTokens.length; i++) {
    const client = new MyClient(userTokens[i], streamingNames[i], streamingUrls[i]);
    clients.push(client);
}
