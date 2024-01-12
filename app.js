const express = require('express');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    res.send(`User ID: ${userId}`);
});

app.get('/', (req, res) => {
    res.render('index', { title: 'Express App' });
});

function customMiddleware(req, res, next) {
    console.log('Custom Middleware executed');
    next(); // Continue to the next middleware/route handler
}

// Use the custom middleware for all routes
app.use(customMiddleware);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/download', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'sample.txt');
    res.download(filePath);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});