const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        author: { type: String, default: 'Unknown', trim: true },
        publishedDate: { type: Date },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Book', BookSchema);