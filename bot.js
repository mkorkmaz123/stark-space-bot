const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
const fs = require('fs'); // Dosya okuma/yazma için

const app = express();
app.use(cors());
app.use(express.json());

const token ='8733690490:AAEml6rZTP0d8VSUMjMoXLwKwXuWF3G8S7g';
const bot = new TelegramBot(token, { polling: true });
const GAME_URL = "https://stark-space-war.vercel.app";

// Basit Veritabanı (Puanlar burada saklanacak)
let users = {};
if (fs.existsSync('database.json')) {
    users = JSON.parse(fs.readFileSync('database.json'));
}

// 1. Puanları Kaydetme API'si
app.post('/save', (req) => {
    const { userId, score } = req.body;
    users[userId] = score;
    fs.writeFileSync('database.json', JSON.stringify(users));
    console.log(`Kullanıcı ${userId} puanı güncellendi: ${score}`);
});

// 2. Puanları Getirme API'si
app.get('/get-score/:userId', (req, res) => {
    const score = users[req.params.userId] || 0;
    res.json({ score });
});

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    console.log(`${chatId} ID'li kullanıcı start verdi!`); // Bunu loglarda görmek için ekle
    
    bot.sendMessage(chatId, "🚀 Stark Space War'a Hoş Geldin!", {
        reply_markup: {
            inline_keyboard: [[
                { text: "OYNA ☄️", web_app: { url: "https://stark-space-war.vercel.app" } }
            ]]
        }
    });
});        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Sunucu ${PORT} portunda başarıyla başlatıldı!`);
});
