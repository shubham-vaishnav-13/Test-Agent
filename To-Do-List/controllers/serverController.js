const http = require('http');
const mongoose = require('mongoose');

require('dotenv').config();

let _server = null;
let _app = null;


async function startServer(app, opts = {}) {
    if (!app) throw new Error('Express app instance is required');

    const port = opts.port || process.env.PORT || 3000;
    const mongoUri = opts.mongoUri || process.env.MONGO_URI;
    _app = app;

    // Connect to MongoDB if URI provided
    if (mongoUri) {
        try {
            await mongoose.connect(mongoUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('MongoDB connected');
        } catch (err) {
            console.error('MongoDB connection error:', err);
            throw err;
        }
    }

    _server = http.createServer(app);

    return new Promise((resolve, reject) => {
        _server.on('error', (err) => {
            console.error('Server error:', err);
            reject(err);
        });

        _server.listen(port, () => {
            console.log(`Server listening on port ${port}`);
            if (typeof opts.onStarted === 'function') opts.onStarted(port);
            resolve(_server);
        });
    });
}

/**
 * Stop the HTTP server and close MongoDB connection if open.
 * @returns {Promise<void>}
 */
async function stopServer() {
    const promises = [];

    if (_server && _server.listening) {
        promises.push(
            new Promise((resolve, reject) => {
                _server.close((err) => {
                    if (err) return reject(err);
                    console.log('HTTP server closed');
                    resolve();
                });
            })
        );
    }

    if (mongoose && mongoose.connection && mongoose.connection.readyState === 1) {
        promises.push(
            mongoose.disconnect().then(() => {
                console.log('MongoDB disconnected');
            })
        );
    }

    await Promise.all(promises).catch((err) => {
        console.error('Error during shutdown:', err);
        throw err;
    });

    _server = null;
    _app = null;
}

/**
 * Install graceful shutdown handlers for SIGINT and SIGTERM.
 * Call this once after startServer if you want automatic shutdown.
 */
function enableGracefulShutdown() {
    const shutdown = async () => {
        try {
            await stopServer();
            process.exit(0);
        } catch (err) {
            console.error('Failed to shut down gracefully:', err);
            process.exit(1);
        }
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
}

module.exports = {
    startServer,
    stopServer,
    enableGracefulShutdown,
};