import { useState } from "react";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import Avatar from "../../components/Avatar";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function ProjectComments({ project }) {
  const { user } = useAuthContext(); // Fetch the authenticated user's information using the useAuthContext hook
  const { updateDocument, response } = useFirestore("projects"); // // Use the useFirestore hook to access Firestore functionality
  const [newComment, setNewComment] = useState(""); // // Initialize a state variable for the new comment

  // Handle the form submission to add a new comment
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new comment object with relevant information
    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    };

    // Update the project document by adding the new comment
    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    });
    // Clear the new comment field if there's no error
    if (!response.error) {
      setNewComment("");
    }
  };

  // Render the UI for the ProjectComments component
  return (
    <div className="project-comments">
      <h4>Project Comments</h4>

      <ul>
        {project.comments.length > 0 &&
          project.comments.map((comment) => (
            <li key={comment.id}>
              <div className="comment-author">
                <Avatar src={comment.photoURL} />
                <p>{comment.displayName}</p>
              </div>
              <div className="comment-date">
                <p>
                  {formatDistanceToNow(comment.createdAt.toDate(), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div className="comment-content">
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
      </ul>

      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </div>
  );
}
// This component is responsible for displaying project comments and allowing users to add new comments.
// It imports necessary modules including useState for state management, timestamp for Firestore timestamps,
// and various custom hooks and components.
// The ProjectComments component receives a project prop, which contains information about
// the current project including its comments.
// The useAuthContext hook is used to fetch the authenticated user's information.
// The useFirestore hook is used to access Firestore functionality,
// including the updateDocument function to update the project document.
// A state variable newComment is initialized to manage the content of the new comment being added.
// The handleSubmit function is triggered when the form is submitted.
//  It creates a new comment object, updates the project document with the new comment,
// and clears the newComment field if there's no error.
// Existing comments are mapped and rendered inside a ul list. Each comment's author, creation date,
//  and content are displayed.
// The creation date is formatted using the formatDistanceToNow function from the date-fns
// library to show how long ago the comment was posted.
// A form allows users to add new comments. The onChange event updates
//  the newComment state as users type.
// When the form is submitted, the handleSubmit function is called to add the
//  new comment to the project's comments array in Firestore.
// The UI is constructed using JSX to render the comments and the comment form.
// Keep in mind that this code might not cover every detail of the
//  application (such as the implementations of the useAuthContext and useFirestore hooks,
// the Avatar component, and styles), so you'll need to refer to those parts of the application
// for a complete understanding.
