export function welcomeMessage(interaction:any, config:any) {
    switch (interaction.options.getSubcommand()) {
        case "toggle":
            // Toggles state of welcome messages
            interaction.reply({ content: `Welcome messages toggled to: ${!config.joinMsgEnabled}`, ephemeral: true });
            config.joinMsgEnabled = !config.joinMsgEnabled;
            break;
        case "set-channel":
            // Get channel and then set the id in the settings
            let channel:any = interaction.options.getChannel("channel");
            interaction.reply({ content: `Welcome messages set to send in: <#${channel.id}>`, ephemeral: true });
            config.joinMsgChannel = channel.id;
            break;
        case "set-message":
            // Sets welcome message
            let message:string = interaction.options.getString("message");
            if (message[0] == '{' && message.slice(-1) == '}' && message.includes("\"description\":")) { 
                // If message is an embed
                config.isJoinEmbed = true;
                config.joinMsg = JSON.parse(message);
            }
            else { 
                // If not embed
                config.isJoinEmbed = false; 
                config.joinMsg = message;
            }
            break;
    }
    return config;
}

export function leaveMessage(interaction:any, config:any) {
    switch (interaction.options.getSubcommand()) {
        case "toggle":
            // Toggles state of leave messages
            interaction.reply({ content: `Leave messages toggled to: ${!config.leaveMsgEnabled}`, ephemeral: true });
            config.leaveMsgEnabled = !config.leaveMsgEnabled;
            break;
        case "set-channel":
            // Get channel and then set the id in the settings
            let channel:any = interaction.options.getChannel("channel");
            interaction.reply({ content: `Leave messages set to send in: <#${channel.id}>`, ephemeral: true });
            config.leaveMsgChannel = channel.id;
            break;
        case "set-message":
            // Sets leave message
            let message:string = interaction.options.getString("message");
            if (message[0] == '{' && message.slice(-1) == '}' && message.includes("\"description\":")) { 
                // If message is an embed
                config.isLeaveEmbed = true;
                config.LeaveMsg = JSON.parse(message);
            }
            else { 
                // If not embed
                config.isLeaveEmbed = false; 
                config.leaveMsg = message;
            }
            break;
    }
    return config;
}