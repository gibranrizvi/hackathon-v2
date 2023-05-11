import { formatDistanceToNow } from "date-fns";

const CommentItem = ({ comment, me }) => {
  const postedByMe = comment.posted_by === me;

  return (
    <div
      className={`chat ${
        postedByMe ? "chat-end" : "chat-start"
      } p-0.5 flex flex-col space-y-0`}
    >
      <div className="text-xs italic">
        {postedByMe ? "Me" : comment.posted_by}{" "}
        <time className="text-xs opacity-50">
          {formatDistanceToNow(new Date(comment.posted_on), {
            addSuffix: true,
          })}
        </time>
      </div>
      <div
        className={`${
          postedByMe ? "bg-indigo-500 text-white" : "bg-white"
        } px-2 py-0.5 text-sm whitespace-normal break-words`}
      >
        {comment.content}
      </div>
    </div>
  );
};

export default CommentItem;
