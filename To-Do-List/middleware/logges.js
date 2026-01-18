



ensureLogDir();

/**
 * Express logger middleware
 * Logs: timestamp, client IP, method, url, status, response time (ms)
 */
module.exports = function logger(req, res, next) {
    const start = process.hrtime();
    const { method, originalUrl: url } = req;
    const ip = req.ip || req.connection?.remoteAddress || '-';
    const time = new Date().toISOString();

    res.on('finish', () => {
        const [s, ns] = process.hrtime(start);
        const ms = (s * 1e3 + ns / 1e6).toFixed(3);
        const status = res.statusCode;
        const line = `${time} | ${ip} | ${method} ${url} | ${status} | ${ms}ms\n`;

        process.stdout.write(line);
        fs.appendFile(logFile, line, (err) => {
            if (err) process.stderr.write(`Logger write error: ${err.message}\n`);
        });
    });

    next();
};