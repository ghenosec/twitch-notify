require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");
const cron = require("node-cron");
const Parser = require("rss-parser");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

const parser = new Parser();

let lastNewsLink = "";
let lastBadgeCount = 0;

async function checkNews() {
    try {
        const feed = await parser.parseURL("https://blog.twitch.tv/pt-br/feed");
        const newest = feed.items[0];

        if (newest.link !== lastNewsLink) {
            const channel = await client.channels.fetch(DISCORD_CHANNEL_ID);
            channel.send(`📰 **Nova notícia da Twitch:**\n${newest.title}\n${newest.link}`);
            lastNewsLink = newest.link;
        }
    } catch (err) {
        console.error("Erro ao buscar notícias:", err.message);
    }
}

async function checkBadges() {
    try {
        const res = await axios.get("https://badges.twitch.tv/v1/badges/global/display");
        const badges = res.data.badge_sets;
        const count = Object.keys(badges).length;

        if (count > lastBadgeCount) {
            const channel = await client.channels.fetch(DISCORD_CHANNEL_ID);
            channel.send("🆕 **Novos emblemas globais adicionados na Twitch!**");
            lastBadgeCount = count;
        }
    } catch (err) {
        console.error("Erro ao verificar badges:", err.message);
    }
}

cron.schedule("*/10 * * * *", checkNews);
cron.schedule("*/15 * * * *", checkBadges);

client.once("clientReady", () => {
    console.log(`Bot online como ${client.user.tag}`);
});

client.login(DISCORD_TOKEN);
