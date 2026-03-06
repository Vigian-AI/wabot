import { Message } from "whatsapp-web.js";
import Command from "./Command";

export class CommandStiker extends Command {

    constructor() {
        super('s', 'Mengubah gambar menjadi stiker', ['stiker'])
    }

    execute(msg: Message, args: string[]): void {
        (async () => {
            try {
                let mediaMsg: Message | null = null;

                // Jika pesan langsung berisi gambar (caption .s
                if (msg.hasMedia) {
                    mediaMsg = msg;
                } else if (msg.hasQuotedMsg) {
                    // Jika pesan adalah balasan dari gambar
                    const quoted = await msg.getQuotedMessage();
                    if (quoted && quoted.hasMedia) {
                        mediaMsg = quoted;
                    }
                }

                if (!mediaMsg) {
                    await msg.reply('Kirim gambar dengan caption *.s* atau balas gambar dengan *.s*');
                    return;
                }

                const media = await mediaMsg.downloadMedia();

                if (!media || !media.mimetype.startsWith('image/')) {
                    await msg.reply('Media harus berupa gambar (jpeg/png/webp)!');
                    return;
                }

                await msg.reply(media, undefined, { sendMediaAsSticker: true });

            } catch (error) {
                await msg.reply('Gagal membuat stiker, coba lagi.');
                console.error('[CommandStiker]', error);
            }
        })();
    }

}

