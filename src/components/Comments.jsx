import { useState } from "react";

import useTasks from "../hooks/useTasks";
import useNotifications from "../hooks/useNotifications";

import CommentItem from "./CommentItem";

const Comments = ({ taskDoc, currentUser, submitting, hideActions }) => {
  const { updateTask, disableTask } = useTasks();
  const { createNotification, getRecipients } = useNotifications();

  const [commentText, setCommentText] = useState("");

  const { task } = taskDoc;

  const { comments } = task;

  const me = currentUser._id;
  const avatar = currentUser.user.photoURL;

  const handleSubmitComment = async e => {
    e.preventDefault();

    const id = currentUser._id + new Date().getTime();

    // update task document with new comment
    const updatedTaskDoc = {
      ...taskDoc,
      task: {
        ...taskDoc.task,
        comments: [
          ...taskDoc.task.comments,
          {
            id,
            content: commentText,
            posted_on: new Date(),
            posted_by: currentUser._id,
          },
        ],
      },
    };

    const response = await updateTask(updatedTaskDoc);

    // if new comment added successfully, create a notification document which will be picked up by the notification listener
    if (response.ok) {
      const recipients = getRecipients(
        task.created_by,
        task.delegated_to,
        task.delegated_group
      );

      const notification = {
        title: `[New comment] ${task.content}`,
        body: `${me}: "${commentText}"`,
        type: "comment",
        task: taskDoc._id,
        recipients,
        seen: [me],
        created_by: me,
        created_at: new Date(),
      };

      const _response = await createNotification(notification);
      if (_response.ok) return setCommentText("");
    }
  };

  return (
    <div className="w-full flex flex-col space-y-1 px-0.5 py-1">
      <div className="card w-full h-56 shadow-sm bg-slate-100 overflow-y-scroll rounded-md px-1 py-2">
        {comments.map((comment, _) => {
          return (
            <CommentItem
              key={comment.id}
              comment={comment}
              me={me}
              avatar={avatar}
            />
          );
        })}
      </div>
      {hideActions ? null : (
        <form
          onSubmit={handleSubmitComment}
          className="flex flex-row space-x-1"
        >
          <div className="form-control w-full">
            <input
              type="text"
              placeholder="Type your comment here..."
              className="input input-sm input-bordered w-full"
              required
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-sm"
            disabled={disableTask(task) || submitting}
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
};

export default Comments;
