import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { router } from './routes/router.js';
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');
app.use('/api', router);

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
console.log(__dirname)
app.use('/static', express.static(path.join(__dirname, 'public')))

app.listen(port, () => console.log(`App running on port ${port}`))