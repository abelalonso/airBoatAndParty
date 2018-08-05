const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema ({
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  boat: { type: Schema.Types.ObjectId, ref: 'Boat' },
  photos: [String],
  date: Date
})

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;