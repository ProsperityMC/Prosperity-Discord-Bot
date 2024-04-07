export function welcomeMessage(interaction:any, config:any) {
    switch (interaction.options.getSubcommand()) {
        case "toggle":
            interaction.reply({ content: `Welcome messages toggled to: ${!config.joinMsgEnabled}`, ephemeral: true });
            config.joinMsgEnabled = !config.joinMsgEnabled;
            break;
        case "set-channel":
            let channel = interaction.options.getChannel("channel");
            interaction.reply({ content: `Welcome messages set to send in: <#${channel.id}>`, ephemeral: true });
            config.joinMsgChannel = channel.id;
            break;
        case "set-message":
            let message = interaction.options.getString("message");
            if (message[0] == '{' && message.splice(-1) == '}' && message.includes("\"description\":")) { 
                config.isJoinEmbed = true;
                config.joinMsg = JSON.parse(message);
            }
            else { 
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
            interaction.reply({ content: `Leave messages toggled to: ${!config.leaveMsgEnabled}`, ephemeral: true });
            config.leaveMsgEnabled = !config.leaveMsgEnabled;
            break;
        case "set-channel":
            let channel = interaction.options.getChannel("channel");
            interaction.reply({ content: `Leave messages set to send in: <#${channel.id}>`, ephemeral: true });
            config.leaveMsgChannel = channel.id;
            break;
        case "set-message":
            let message = interaction.options.getString("message");
            if (message[0] == '{' && message.splice(-1) == '}' && message.includes("\"description\":")) { 
                config.isLeaveEmbed = true;
                config.LeaveMsg = JSON.parse(message);
            }
            else { 
                config.isLeaveEmbed = false; 
                config.leaveMsg = message;
            }
            break;
    }
    return config;
}