import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, FormGroup, Label } from "reactstrap";

import axiosWithAuth from "../utils/axios-auth";

function AddFriend(props) {
  const { history, match } = props;
  const { handleSubmit, register, errors, setError, setValue } = useForm();

  const { id } = match.params;

  useEffect(() => {
    if (id) {
      console.log(id);
    }
    // eslint-disable-next-line
  }, [id]);

  const onSubmit = values => {
    console.log(values);
    axiosWithAuth()
      .post("/api/friends", values)
      .then(({ data }) => {
        console.log(data);
        history.push("/friends");
      })
      .catch(err => console.dir(err));
  };

  return (
    <form className="form add-friend" onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label for="name">Name</Label>
        <input
          className="form-control"
          name="name"
          type="text"
          id="name"
          ref={register({
            required: "Required"
          })}
        />
        <span className="error">{errors.name && errors.name.message}</span>
      </FormGroup>
      <FormGroup>
        <Label for="age">Age</Label>
        <input
          className="form-control"
          type="number"
          name="age"
          id="age"
          ref={register({
            required: "Required"
          })}
        />
        <span className="error">{errors.age && errors.age.message}</span>
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <input
          className="form-control"
          type="email"
          name="email"
          id="email"
          ref={register({
            required: "Required"
          })}
        />
        <span className="error">{errors.email && errors.email.message}</span>
      </FormGroup>
      <Button type="submit" color="primary" size="lg" block>
        {id ? "Edit Friend" : "Create Friend"}
      </Button>
      <span className="error">
        {errors.response && errors.response.message}
      </span>
    </form>
  );
}

export default AddFriend;
