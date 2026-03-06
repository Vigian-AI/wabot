import { CommandSay } from "./commands/CommandP";
import { CommandStiker } from "./commands/CommandStiker";
import Command from "./commands/Command";


const commands: Command[] = [
    new CommandSay(),
    new CommandStiker(),
];

export default commands