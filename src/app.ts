import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import commands from "./commands";

const client = new Client({
    restartOnAuthFail: true,
    webVersionCache: {
        type: "local",
    },
    puppeteer: {
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
        ],
    },
    authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true})
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    for (const command of commands){
        command.handle(msg);
    }
});

client.initialize();