import { Schema, model, models, mongoose } from "mongoose";


const ReactionSchema = new Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  type: {
    type: String,
    required: true,
    enum: ['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry']
  }

}, { timestamps: true })

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
    attachments: {
      type: [String],
      default: [],
    },
    commentReactions: [],
    commentReply: {

      type: [
        {
          type: String,
        },
      ],
      default: []
    }
  },
  { timestamps: true }
);


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
    attachments: {
      type: [String],
      default: [],
    },
    reactions: {
      type: [ReactionSchema],
      default: []

    },
    shares: {
      type: Array,
      default: [],
    },
    peopleTag: {
      type: Array,
      default: [],
    },
    comments: {
      type: [CommentSchema],
      default: []
    },
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", PostSchema);
export default Post;
