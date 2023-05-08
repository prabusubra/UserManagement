import { useState, useReducer } from "react";

export default function UserInfo() {

  function userReducer(prevState, action){
    let tmpState = {...prevState};
    switch(action.type){
      case "ADD_NAME":
        tmpState.fullName = action.payload;
        break;
      case "ADD_USER_ID":
        tmpState.userName = action.payload;
        break;
      case "CLEAR":
        tmpState = {}
        break;
      default:
        break;
    }
    return tmpState
  }

  const [userDetails, dispatch] = useReducer(userReducer, {fullName: "", userName: ""});

  async function handleSubmit(e) {
    const SERVICE_URL = "http://localhost:3030/users";
    e.preventDefault();
    try {
      console.log(" handleSubmit : " + userDetails.fullName + " userName : " + userDetails.userName);
      const resp = await fetch(SERVICE_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json"
       },
       body: JSON.stringify({ name: userDetails.fullName, userid: userDetails.userName })
      });
      console.log(resp);
    } catch (e){
      console.log(e);
    }
    //dispatch({type: "CLEAR"});
  }

  return (
    <div className="mui-container">
      <div className="mui-panel">
        <form className="mui-form" onSubmit={handleSubmit}>
          <div className="mui-textfield">
            <input
              type="text"
              value={userDetails.fullName}
              onChange={(e) => {
                dispatch({type: "ADD_NAME", payload: e.target.value});
              }}
            />
            <label>Full Name</label>
          </div>
          <div className="mui-textfield">
            <input
              type="text"
              value={userDetails.userName}
              onChange={(e) => {
                dispatch({type: "ADD_USER_ID", payload: e.target.value});
              }}
            />
            <label>User Name </label>
          </div>
          <button className="mui-btn mui-btn--primary">Add</button>
        </form>
      </div>
    </div>
  );
}
