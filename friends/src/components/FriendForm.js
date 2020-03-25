import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, FormGroup, Label } from "reactstrap";

import axiosWithAuth from "../utils/axios-auth";

function FriendForm(props) {
  const { history, match } = props;
  const { handleSubmit, register, errors, setError, setValue } = useForm();

  const { id } = match.params;
  console.log(history);

  useEffect(() => {
    if (id) {
      // TODO: lift state to avoid passing it through history.location
      const friend = history.location.state;
      if (!friend) history.push("/friends");
      const values = [];
      for (let field in friend) {
        values.push({ [field]: friend[field] });
      }
      setValue(values);
    }
    // eslint-disable-next-line
  }, [id]);

  const addFriend = values => {
    axiosWithAuth()
      .post("/api/friends", values)
      .then(({ data }) => {
        history.push("/friends");
      })
      .catch(err => console.dir(err));
  };

  const editFriend = (values, id) => {
    axiosWithAuth()
      .put(`/api/friends/${id}`, values)
      .then(({ data }) => {
        history.push("/friends");
      })
      .catch(err => console.dir(err));
  };

  const onSubmit = values => {
    id ? editFriend(values, id) : addFriend(values);
  };

  return (
    <form className="form friend-form" onSubmit={handleSubmit(onSubmit)}>
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

export default FriendForm;
