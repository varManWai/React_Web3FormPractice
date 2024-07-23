import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";

function Contact() {
  const [result, setResult] = React.useState("");
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const onEmailChange = (event) => {
    setInputData({ ...inputData, email: event.target.value });
  };
  const onNameChange = (event) => {
    setInputData({ ...inputData, name: event.target.value });
  };
  const onMsgChange = (event) => {
    setInputData({ ...inputData, message: event.target.value });
    console.log(inputData.message);
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData();

    formData.append("name", inputData.name);
    formData.append("email", inputData.email);
    formData.append("message", inputData.message);

    console.log(process.env.REACT_APP_WEB3FORM_API_KEY);

    formData.append("access_key", process.env.REACT_APP_WEB3FORM_API_KEY);

    formData.forEach((e) => {
      console.log(e);
    });

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      setInputData({email:"",name:"",message:""})
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="contactMe-section">
      <h1 className="CMheader">Contact Me</h1>
      <form onSubmit={onSubmit}>
        <TextField
          required
          fullWidth
          id="outlined-required"
          label="Email"
          color="success"
          value={inputData.email}
          onChange={onEmailChange}
          notched
          inputProps={{ style: { fontSize: 16 } }} // font size of input text
          InputLabelProps={{
            shrink: true,
            style: { fontSize: 16 },
          }}
          className="contact-form-fields"
        />
        <TextField
          required
          fullWidth
          id="outlined-required"
          label="Name"
          size="normal"
          color="success"
          value={inputData.name}
          onChange={onNameChange}
          inputProps={{ style: { fontSize: 16 } }} // font size of input text
          InputLabelProps={{
            shrink: true,
            style: { fontSize: 16 },
          }} // font size of input label
          className="contact-form-fields"
        />
        <TextField
          id="outlined-multiline-static"
          label="Message"
          required
          multiline
          rows={4}
          fullWidth
          color="success"
          value={inputData.message}
          onChange={onMsgChange}
          inputProps={{ style: { fontSize: 16 } }} // font size of input text
          InputLabelProps={{
            shrink: true,
            style: { fontSize: 16 },
          }} // font size of input label
          className="contact-form-fields"
        />
        
        <ColorButton  type="submit" variant="contained" className="CM-btn">Send</ColorButton>
        {/* <button type="submit">Submit Form</button> */}
      </form>
      <span className="CM-result">{result}</span>
    </div>
  );
}

export default Contact;
