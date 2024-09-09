const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEVtWnFKWFZOQVMxbWZIL0FJMnhtK2VueVNwRktveWhocG9UMkVGdm0zRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM3FkNDlZZXB3WERVdVowejNHaU1Ud1lieVFCWHdvMHgzNkxCcnZjZkxCbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNTmpJb1diRkVtbVhuTXI4WHJPSGpXREtGWGN0TWhDSEQ5NUhJa0JEd2tzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkWFZBVGEwdStCaE9NdnhYTnlyYWlYczdGYThtMkFoOExmOWtqREJOMUgwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRMWVp2SFBlSzlUcllSWUk4UmY3R3JjcEdUczRqV2Y5ajRLamw0UFdIMFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImR6ZnRmMGdrT1piK3NRTS82YUNJcmFPU1JzREUwOGhuYTRmZDRlc3NIMm89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicVBDbVYzNENIQzBaUksxWm9SMkYyVmpRb1dlVDRrbTRjZGtnLzBtT2dHQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0FRTjk0cUoxZE1aRXRwZTZCM1ozWTZuNlFQbTFVNTBzcWRwZHVqb2FVZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im4zbFgzMiswb0dXRklseEdqdFhKRWtRSHplTTgrOElXeU5zWkxJUUd0OFpoUVhuNXFEMjFxaTdzbFA1OVZZWllEYTZtbXZMVHJLaE85MHRvUHlsTkFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY4LCJhZHZTZWNyZXRLZXkiOiJWZ0ttdU5TNVIzTGtpOTUrL21ZdXo3Q0g5cktBSlczUTN5S284ajI4cXpvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJQRG5kYVZWZVE2MnIza1VCc29RQVpRIiwicGhvbmVJZCI6IjhlZmQzODRmLTc1ODUtNDY3Ni1hYjUwLWU2YWZhMjk3NDQ5MyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4cW1LNCs2dmlHa1o2SndKWFl6Vms0aGtHYXc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaFlTb2EwSmI4WXRxV2xGUDN0MHhvRGwvbjBNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IktTOFBNNDVTIiwibWUiOnsiaWQiOiIyNjM3ODQ3OTM2MTE6MTlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiS2luZyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUGJ2OUtJREVNR0wvYllHR0F3Z0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoidTdUYlU4aU80QUZHMTFUS2U3Y2JYaFRpa0pwSWt6OGxqR1AxRGc0aElIND0iLCJhY2NvdW50U2lnbmF0dXJlIjoieklEZVBLTnJzc1lVcGd3M2M0aVkxRXJnd3FoeWs5c1JZR3ZTQmM1aGJ2eHFYanFFdTNiaWdQRHRDWFRMSENkMTdxYUlFZm5vQitoWUtCcmxHNGYzRFE9PSIsImRldmljZVNpZ25hdHVyZSI6IlpBSHpjRHlPSS81dGR4QTVDbmV5WHFNK0ZzRWFnU3VlWmlRVDFSM0VObW8waFFMZFdFQTZZNExlSVMweTliNUl0SFBoSmFhU3FEYmVDc3Fub09SaUN3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzg0NzkzNjExOjE5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJ1MDIxUElqdUFCUnRkVXludTNHMTRVNHBDYVNKTS9KWXhqOVE0T0lTQisifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjU5MDg0MzAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSmErIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Takunda",
    NUMERO_OWNER : process.env.OWNER_NUM || "263771174837",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'King Eli ',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/2fc766ab7467ded0fac9c.png',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
