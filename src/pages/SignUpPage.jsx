import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Form, Container, Row, Col, Button } from "react-bootstrap";

import { signUp } from "../actions/user";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const validationRules = {
    email: {
      required: { value: true, message: "Email is required" }
    },
    login: {
      required: { value: true, message: "Login is required" },
      minLength: { value: 4, message: "Login min length is 4" },
      maxLength: { value: 12, message: "Login max length is 12" }
    },
    password: {
      required: { value: true, message: "Password is required" },
      minLength: { value: 8, message: "Password min length is 8" },
      maxLength: { value: 18, message: "Password max length is 18" }
    }
  };

  const onSubmit = data => {
    dispatch(signUp(data.email, data.login, data.password), { shouldHandleLoadingState: true });
    reset({ email: "", ogin: "", password: "" });
  }

  return (
    <Container>
      <Row>
        <Col className="text-center">
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
                isInvalid={errors.login}
                type="string"
                placeholder="Login"
                {...register("login", { ...validationRules.login })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.login?.message}
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
            <Button variant="primary" type="submit">Sign Up</Button>
          </Form>
          <Link className="btn btn-link" to="/sign-in" replace >Sign In</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;