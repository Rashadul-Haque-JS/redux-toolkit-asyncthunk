import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { fetchUsers, removeUser } from "./features/userSlicer";

function App() {
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);


  return (
    <div
      className="App"
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {users.length &&
        users.map((user) => (
          <div
            key={user.id}
            style={{
              width: "180px",
              padding: "20px",
              textAlign: "center",
              border: "1px solid",
              margin: "20px",
              backgroundColor: "hotpink",
            }}
          >
            <p>{user.id}</p>
            <h3>{user.name}</h3>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <button onClick={()=>{dispatch(removeUser(user.id))}}>remove</button>
          </div>
        ))}

      {status === "pending" && <p>{status}</p>}

      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
