import {mongoose, model, models, Schema} from "mongoose";

const ReactionSchema = new Schema({
  createBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  type:{
    type: String,
    required:true,
    enum: ['like', 'love', 'care','haha','wow', 'sad','angry'], // Predefined options for consistency
  }

},{timestamps:true})
const Reaction = models.Reaction || model('Reaction', ReactionSchema);
export default Reaction;