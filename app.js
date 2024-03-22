
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

const PORT = 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/test.html');
});

// Handle POST requests to create a file
app.post('/create_file', async (req, res) => {
    const { filename, extension } = req.body;

    try {
        await createFile(filename, extension);
        res.json({ success: 'File created successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the file.' });
    }
});

// Function to create a file
async function createFile(filename, extension) {
    const fileContent = `// File: ${filename}.${extension}\n`;
    const filePath = `${filename}.${extension}`;
    await fs.promises.writeFile(filePath, fileContent);
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
