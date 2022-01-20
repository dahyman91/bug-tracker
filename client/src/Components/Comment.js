import { useEffect, useState } from "react";
import { Avatar, Grid, Paper } from "@material-ui/core";

function Comment({ comment }) {
  const [name, setName] = useState("");

  useEffect(() => {
    fetch(`/api/users/${comment.user_id}`)
      .then((r) => r.json())
      .then((data) => setName(`${data.first_name} ${data.last_name}`));
  }, []);

  const imgLink =
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

  return (
    <Paper style={{ width: "30%", padding: "40px 20px", margin: "auto" }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="Remy Sharp" src={imgLink} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: "left" }}>{name}</h4>
          <p style={{ textAlign: "left" }}>{comment.message}</p>
          <p style={{ textAlign: "left", color: "gray" }}>
            posted 1 minute ago
          </p>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Comment;
