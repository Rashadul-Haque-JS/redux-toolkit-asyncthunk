import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { fetchUsers, removeUser, addUser, editUser} from "./features/userSlicer";

function App() {
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleCreateUser = () =>{
    dispatch(addUser({id: users.length + 1, name:'Foo Bar', email: 'foo@bar.com'}));
  }


  return (
    <>
    <button onClick={handleCreateUser}>add user</button>
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
            <button onClick={()=>{dispatch(editUser({id: user.id, name:'Foo Bar', email: 'foo@bar.com', username:'fob', phone:'070888888'}))}}>edit</button>
          </div>
        ))}

      {status === "pending" && <p>{status}</p>}

      {error && <p>{error}</p>}
      
    </div>
    </>
  );
}

export default App;
