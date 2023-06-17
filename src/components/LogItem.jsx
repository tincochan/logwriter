import React from "react";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Moment from "react-moment";

const LogItem = ({
  log: { _id, text, priority, user, created },
  deleteItem,
}) => {
  const setVariant = () => {
    if (priority === "high") {
      return "danger";
    } else if (priority === "moderate") {
      return "warning";
    } else {
      return "success";
    }
  };

  return (
    <tr>
      <td>
        <Badge className={`p-2 badge bg-${setVariant()}`}>
          <span>{priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
        </Badge>
      </td>
      <td>{text}</td>
      <td>{user}</td>
      <td>
        <Moment format="MMMM Do YYYY h:mm:ss">{new Date(created)}</Moment>
      </td>
      <td>
        <Button variant="danger" size="sm" onClick={() => deleteItem(_id)}>
          x
        </Button>
      </td>
    </tr>
  );
};

export default LogItem;
