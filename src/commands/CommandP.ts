import { Message } from "whatsapp-web.js";
import Command from "./Command";

export class CommandSay extends Command{
    
    constructor(){
        super('p', 'ini adalah command say', ['p2'])
    }

    execute(msg: Message, args: string[]): void {
        if(args.length < 1){
            msg.reply('p')
            return;
        }
        msg.reply(args.join(' '))
    }
    
}

