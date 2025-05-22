const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
const items = [
    { id: '1', title: 'Item 1', description: 'Description for Item 1' },
    { id: '2', title: 'Item 2', description: 'Description for Item 2' },
    { id: '3', title: 'Item 3', description: 'Description for Item 3' }
];
const VALID_EMAIL = 'admin@gmail.com';
const VALID_PASSWORD = 'password';
app.post('/api/login', async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const { email, password } = req.body;
    console.log('Login attempt:', { email, password });
    if (!email || !password) {
        console.log('Missing email or password');
        return res.status(400).json({ error: 'Email and password are required' });
    }
    if (email !== VALID_EMAIL || password !== VALID_PASSWORD) {
        console.log('Invalid credentials');
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = Math.random().toString(36).substring(7);
    console.log('Generated token:', token);
    res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
    });

    const response = {
        token: token,
        user: {
            email: email
        }
    };
    res.json(response);
});
app.get('/api/items', async(req, res) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Items request successful');
    res.json(items);
});
app.post('/api/logout', async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Logout request received');
    res.clearCookie('authToken');
    res.json({ message: 'Logged out successfully' });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 