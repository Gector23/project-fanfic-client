import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Form, Container, Row, Col, Button } from "react-bootstrap";

import { signIn } from "../actions/user";

const SignInPage = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const validationRules = {
    email: {
      required: { value: true, message: "Email is required" }
    },
    password: {
      required: { value: true, message: "Password is required" },
      minLength: { value: 8, message: "Password min length is 8" },
      maxLength: { value: 18, message: "Password max length is 18" }
    }
  };

  const onSubmit = data => {
    dispatch(signIn(data.email, data.password), { shouldHandleLoadingState: true, process: "sign-in" });
    reset({ email: "", password: "" });
  };

  return (
    <Row className="justify-content-center">
      <Col className="text-center" sm={8} md={6}>
        <Form onSubmit={handleSubmit(onSubmit)} >
          <div className="mb-3">
            <Form.Control
              isInvalid={errors.email}
              type="email"
              placeholder="Email"
              {...register("email", { ...validationRules.email })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <Form.Control
              isInvalid={errors.password}
              type="password"
              placeholder="Password"
              {...register("password", { ...validationRules.password })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </div>
          <Button variant="primary" type="submit">Sign In</Button>
        </Form>
        <Link className="btn btn-link" to="/sign-up" replace >Sign Up</Link>
      </Col>
    </Row>
  );
};

export default SignInPage;