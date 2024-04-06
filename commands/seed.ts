export function seed(interaction:any) {
    const server = interaction.options.getString("server");
    let seed = "";
    if (server == "survival") {
        seed = "-6265140814097726510";
    } else if (server == "creative") {
        seed = "-606203017461262797";
    }
    interaction.reply({ content: `The seed is \`${seed}\`` });
}