import { useEffect, useState } from "react";
import { Avatar, Grid, Paper } from "@material-ui/core";

function Comment({ comment }) {
  const [name, setName] = useState("");

  useEffect(() => {
    fetch(`/api/users/${comment.user_id}`)
      .then((r) => r.json())
      .then((data) => setName(`${data.first_name} ${data.last_name}`));
  }, [comment.user_id]);

  function getTimeSincePost(postedDate) {
    let now = new Date();
    const millis = Date.parse(now) - Date.parse(postedDate);
    let string;
    if (millis < 60000) {
      string = "Just Now";
    } else if (millis < 3600000) {
      let minutes = Math.floor(millis / 60000);
      string = `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    } else if (3600000 < millis < 1000 * 60 * 60 * 24) {
      let hours = Math.floor(millis / (1000 * 60 * 60));
      string = `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else {
      string = new Date(postedDate).toDateString();
    }
    return string;
  }

  return (
    <Paper style={{ width: "30%", padding: "40px 20px", margin: "auto" }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: "left" }}>{name}</h4>
          <p style={{ textAlign: "left" }}>{comment.message}</p>
          <p style={{ textAlign: "left", color: "gray" }}>
            {getTimeSincePost(comment.created_at)}
          </p>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Comment;
