import { useState } from "react";

export default function UserInfo() {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");

  async function handleSubmit(e) {
    const SERVICE_URL = "http://localhost:3030/users";
    e.preventDefault();
    console.log(" handleSubmit : " + fullName + " userName : " + userName);
    const resp = await fetch(SERVICE_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ name: fullName, userid: userName })
    });
    console.log(resp);
    setFullName("");
    setUserName("");
  }

  return (
    <div className="mui-container">
      <div className="mui-panel">
        <form className="mui-form" onSubmit={handleSubmit}>
          <div className="mui-textfield">
            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
            <label>Full Name</label>
          </div>
          <div className="mui-textfield">
            <input
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
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
