import pug from 'pug';
import express from 'express';
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js';
import mapRoutes from './routes/mapRoutes.js';

const app = express();
const PORT = 3000;

app.set('view engine', 'pug')
app.use(express.static('./public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/', authRoutes);
app.use('/', mapRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

