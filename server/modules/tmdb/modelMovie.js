var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var parser = require('./parser.js');

var tmdbMovieSchema = mongoose.Schema({
    id:Number,
    title:String,
    titles:[{title:String,lang:String}],
    release_date:Date,
    img:String,
    adult:Boolean,
    description: String,
    status: String,
    imdb_id: String
});

tmdbMovieSchema.statics.findOrCreate = function(inputMovie,callback){
    this.findOne({'id':inputMovie.id},function(err,movie){
        if(err){
            return callback(err,null);
        }
        if(!movie) {
            movie = new tmdbMovie();
        }
        parser.parseMovie(movie,inputMovie);
        return movie.save(callback);
    });
};

tmdbMovieSchema.plugin(timestamps);
var tmdbMovie = mongoose.model('InfoTmdbMovie', tmdbMovieSchema);