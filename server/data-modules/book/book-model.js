var mongoose = require('mongoose');
var plugins = rootRequire('lib/mongoose-plugins.js');

var bookSchema = mongoose.Schema({
    title: String,
    page: Number,
    author: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

bookSchema.plugin(plugins.timestamps);
bookSchema.plugin(plugins.stats);
bookSchema.plugin(plugins.info);
bookSchema.plugin(plugins.rating);
mongoose.model('Book', bookSchema);