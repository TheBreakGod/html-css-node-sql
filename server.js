const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // เปลี่ยนเป็นชื่อผู้ใช้ MySQL ของคุณ
    password: 'root', // เปลี่ยนเป็นรหัสผ่าน MySQL ของคุณ
    database: 'todo_db' // ชื่อฐานข้อมูล MySQL ของคุณ
});

// เชื่อมต่อกับฐานข้อมูล MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// สร้างตารางถ้ายังไม่มี
db.query(`
    CREATE TABLE IF NOT EXISTS todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        task VARCHAR(255) NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT false
    )
`, (err) => {
    if (err) {
        console.error('Error creating table:', err);
    }
});

// GET /todos - ดึงรายการงานทั้งหมด
app.get('/todos', (req, res) => {
    db.query('SELECT * FROM todos', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ todos: results });
    });
});

// POST /todos - เพิ่มรายการงานใหม่
app.post('/todos', (req, res) => {
    const { task } = req.body;
    db.query('INSERT INTO todos (task, completed) VALUES (?, ?)', [task, false], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: results.insertId, task: task, completed: false });
    });
});

// POST /contact - รับข้อมูลการติดต่อ
app.post('/contact', (req, res) => {
    const { name, email, number, message } = res.body;
    res.json({ message: 'Contact information received', data: req.body });
});

// PUT /todos/:id - อัปเดตรายการงานที่มีอยู่
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { task, completed } = req.body;
    db.query('UPDATE todos SET task = ?, completed = ? WHERE id = ?', [task, completed, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: id, task: task, completed: completed });
    });
});

// DELETE /todos/:id - ลบรายการงาน
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM todos WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Todo deleted' });
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
