import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import { ipcRenderer } from "electron";

import LogItem from "./components/LogItem.jsx";
import AddLogItem from "./components/AddLogItem.jsx";

const App = () => {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success",
  });
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    ipcRenderer.send("logs:load");

    ipcRenderer.on("logs:get", (e, logs) => {
      setLogs(JSON.parse(logs));
    });

    ipcRenderer.on("logs:clear", () => {
      setLogs([]);
      showAlert("Logs Cleared");
    });
  }, []);

  const addItem = (item) => {
    if (item.text === "" || item.user === "" || item.priority === "") {
      showAlert("Please enter all fields", "danger");
      return false;
    }
    ipcRenderer.send("logs:add", item);

    showAlert("Log added");
  };

  const deleteItem = (_id) => {
    ipcRenderer.send("logs:delete", _id);
    showAlert("Log deleted");
  };

  const showAlert = (message, variant = "success", seconds = 3000) => {
    setAlert({
      show: true,
      message,
      variant,
    });

    setTimeout(() => {
      setAlert({
        show: false,
        message: "",
        variant: "success",
      });
    }, seconds);
  };

  return (
    <Container>
      <div className="text-center m-3">
        <h1>System Logs</h1>
      </div>
      <AddLogItem addItem={addItem} />

      {alert.show && (
        <Alert
          variant={alert.variant}
          onClose={() => setAlert({ show: false })}
          dismissible
        >
          {alert.message}
        </Alert>
      )}

      <Table>
        <thead>
          <tr>
            <th>Priority</th>
            <th>Log Text</th>
            <th>User</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <LogItem log={log} key={log._id} deleteItem={deleteItem} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
