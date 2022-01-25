import { useEffect, useState } from "react";
import { Avatar, Grid, Paper } from "@material-ui/core";

function Comment({ comment }) {
  const [name, setName] = useState("");

  useEffect(() => {
    fetch(`/api/users/${comment.user_id}`)
      .then((r) => r.json())
      .then((data) => setName(`${data.first_name} ${data.last_name}`));
  }, [comment.user_id]);
  console.log(comment);

  function getTimeSincePost(millis) {
    let string;
    if (millis < 60000) {
      string = "Posted Just Now";
    } else if (60000 < millis < 3600000) {
      var minutes = Math.floor(millis / 60000);
      string = `Posted ${minutes} minutes ago`;
    }
    return string;
  }

  let curDate = Date.parse(new Date());
  let postDate = Date.parse(comment.created_at);

  console.log(getTimeSincePost(curDate - postDate));

  return (
    <Paper style={{ width: "30%", padding: "40px 20px", margin: "auto" }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: "left" }}>{name}</h4>
          <p style={{ textAlign: "left" }}>{comment.message}</p>
          <p style={{ textAlign: "left", color: "gray" }}>
            {getTimeSincePost(
              Date.parse(new Date()) - Date.parse(comment.created_at)
            )}
          </p>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Comment;
