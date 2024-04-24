import { mongoose, model, models, Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    content: {
      type: String,
    },
    attachments: [
      {
        type: String,
        default: null,
      },
    ],
    commentReactions: [],
    commentReply: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Comment = models.Comment || model("Comment", CommentSchema);
export default Comment;
