-- สร้างฐานข้อมูล
CREATE DATABASE todo_db;

-- เลือกฐานข้อมูล
USE todo_db;

-- สร้างตาราง
CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false
);

-- เพิ่มข้อมูล
INSERT INTO todos (task, completed) VALUES ('Sample Task', false);

UPDATE todos
SET task = 'Updated Task', completed = true
WHERE id = 1;

DELETE FROM todos
WHERE id = 3;

SELECT * FROM todos
WHERE email LIKE '%@example.com';

