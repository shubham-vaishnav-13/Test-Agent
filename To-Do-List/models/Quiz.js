const mongoose = require('mongoose');

const { Schema } = mongoose;

const ChoiceSchema = new Schema({
    text: { type: String, required: true, trim: true },
    // optional metadata for a choice
    meta: { type: Schema.Types.Mixed, default: {} }
}, { _id: true });

const QuestionSchema = new Schema({
    text: { type: String, required: true, trim: true },
    type: { type: String, enum: ['single', 'multiple', 'text'], default: 'single' },
    choices: { type: [ChoiceSchema], default: [] },
    // store correct answers as indexes into choices (for single: one index, for multiple: array)
    correctIndexes: { type: [Number], default: [] },
    points: { type: Number, default: 1, min: 0 },
    timeLimitSeconds: { type: Number, default: null } // null means no per-question limit
}, { _id: true });

const QuizSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: '' },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    questions: { type: [QuestionSchema], default: [] },
    settings: {
        shuffleQuestions: { type: Boolean, default: false },
        shuffleChoices: { type: Boolean, default: false },
        totalTimeSeconds: { type: Number, default: null } // null means no total time limit
    },
    published: { type: Boolean, default: false }
}, { timestamps: true });

// helper: compute total points
QuizSchema.virtual('totalPoints').get(function () {
    return this.questions.reduce((sum, q) => sum + (q.points || 0), 0);
});

module.exports = mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema);