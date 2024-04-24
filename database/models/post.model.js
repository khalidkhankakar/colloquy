import { Schema, model, models, mongoose } from "mongoose";
import Comment from "./comment.model";
import Reaction from "./reaction.model";

const PostSchema = new Schema(
  {
    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    attachments: [
      {
        type: String,
        default: null,
      },
    ],
    reactions: [Reaction],
    shares: {
      type: Array,
      default: [],
    },
    peopleTag: {
      type: Array,
      default: [],
    },
    comments: [Comment],
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", PostSchema);
export default Post;
