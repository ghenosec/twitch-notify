# Twitch Notify Bot (Discord)

Um bot simples para Discord que envia automaticamente notificações sobre:

- 📰 **Novas notícias publicadas no blog oficial da Twitch**
- 🆕 **Novos emblemas (badges) globais adicionados pela Twitch**, incluindo imagem da badge

O bot verifica periodicamente os endpoints da Twitch e publica as atualizações em um canal específico do Discord definido no `.env`.

## Tecnologias utilizadas
- Node.js
- Discord.js
- Axios
- Node-cron
- RSS Parser

## Como usar
1. Crie um bot no Discord Developer Portal.
2. Coloque seu token e ID do canal no arquivo `.env`:
```bash
    DISCORD_TOKEN=seu_token
    DISCORD_CHANNEL_ID=canal
```

3. Instale as dependências: `npm install`
4. Inicie o bot: `node script.js`

