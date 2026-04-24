const { google } = require('googleapis');

// Initialize Google OAuth2 client
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CALLBACK_URL
);

const GOOGLE_CLIENT_SECRET = "ghp_VQFnNeOhgoNtoiC9oD8KGCFVTI1hjw2x"

// Get authorization URL
exports.getAuthUrl = (req, res) => {
    const scopes = ['https://www.googleapis.com/auth/tasks'];
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
    });
    res.json({ url: authUrl });
};

// Handle OAuth callback
exports.handleCallback = async (req, res) => {
    const { code } = req.query;
    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        res.json({ tokens });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get tasks from Google Tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = google.tasks({ version: 'v1', auth: oauth2Client });
        const result = await tasks.tasklists.list();
        res.json(result.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};