const express = require('express');
const app = express();
const { sql, poolPromise } = require('./db');

app.use(express.json());

app.get('/users', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM users');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(err.message);
    }
});

app.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('ID', sql.Int, userId)
            .query('SELECT * FROM users WHERE ID = @ID');

        if (result.recordset.length === 0) {
            res.status(404).send('User not found');
        } else {
            res.json(result.recordset[0]);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/users', async (req, res) => {
    const { id, email, name, age } = req.body;

    try {
        const pool = await poolPromise;
        await pool.request()
            .input('ID', sql.Int, id)
            .input('EMAIL', sql.VarChar, email)
            .input('NAME', sql.VarChar, name)
            .input('AGE', sql.Int, age)
            .query('INSERT INTO users (ID, EMAIL, [NAME], AGE) VALUES (@ID, @EMAIL, @NAME, @AGE)');

        res.status(201).send('User created successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.put('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const { email, name, age } = req.body;

    try {
        const pool = await poolPromise;
        await pool.request()
            .input('ID', sql.Int, userId)
            .input('EMAIL', sql.VarChar, email)
            .input('NAME', sql.VarChar, name)
            .input('AGE', sql.Int, age)
            .query(
                'UPDATE users SET EMAIL = @EMAIL, [NAME] = @NAME, AGE = @AGE WHERE ID = @ID'
            );

        res.send('User updated successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('ID', sql.Int, userId)
            .query('DELETE FROM users WHERE ID = @ID');

        if (result.rowsAffected[0] === 0) {
            res.status(404).send('User not found');
        } else {
            res.send('User deleted successfully');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});