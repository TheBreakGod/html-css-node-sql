
USE todo_db;

CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false
);


INSERT INTO todos (task, completed) VALUES ('Sample Task', false);
UPDATE todos
SET task = 'Updated Task', completed = true
WHERE id = 1;
DELETE FROM todos
WHERE id = 3;
SELECT * FROM todos;


