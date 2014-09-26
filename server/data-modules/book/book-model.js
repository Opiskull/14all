var mongoose = require('mongoose');
var plugins = requireLib('mongoose-plugins.js');

var bookSchema = mongoose.Schema({
    title: {type: String, required: true},
    page: {type: Number, min: 0, default: 0},
    author: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

bookSchema.plugin(plugins.timestamps);
bookSchema.plugin(plugins.stats);
bookSchema.plugin(plugins.info);
bookSchema.plugin(plugins.rating);
bookSchema.plugin(plugins.tags);
bookSchema.plugin(plugins.hidden);
bookSchema.plugin(plugins.changes);
mongoose.model('Book', bookSchema);