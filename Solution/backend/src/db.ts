import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';

const db = new sqlite3.Database(':memory:');

function initializeDatabase() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY,
        chatid INTEGER,
        message TEXT,
        userid INTEGER,
        ts INTEGER
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT,
        password TEXT
      )
    `);

    const messagesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/messages.json'), 'utf-8'));
    const insertMessage = db.prepare('INSERT INTO messages (id, chatid, message, userid, ts) VALUES (?, ?, ?, ?, ?)');
    messagesData.forEach((message: any) => {
      insertMessage.run(message.id, message.chatid, message.message, message.userid, message.ts);
    });
    insertMessage.finalize();

    const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/users.json'), 'utf-8'));
    const insertUser = db.prepare('INSERT INTO users (id, username, password) VALUES (?, ?, ?)');
    usersData.forEach((user: any) => {
      insertUser.run(user.id, user.username, user.password);
    });
    insertUser.finalize();
  });
}

initializeDatabase();

export default db;