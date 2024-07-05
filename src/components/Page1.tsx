import * as React from "react";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  phoneNumber: string;
  email: string;
}

const Page1 = () => {
  const [user, setUser] = useState<User>({
    name: "",
    phoneNumber: "",
    email: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/page2");
  };

  return (
    <div>
      <h1>Form Page</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={user.name}
          onChange={(event) => setUser({ ...user, name: event.target.value })}
        />
        <br />
        <br />
        <TextField
          label="Phone Number"
          value={user.phoneNumber}
          onChange={(event) =>
            setUser({ ...user, phoneNumber: event.target.value })
          }
        />
        <br />
        <br />
        <TextField
          label="Email"
          value={user.email}
          onChange={(event) => setUser({ ...user, email: event.target.value })}
        />
        <br />
        <br />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Page1;
