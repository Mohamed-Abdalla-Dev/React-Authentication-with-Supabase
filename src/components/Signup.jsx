import { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import { Link } from "react-router";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth(); // Calling the recording function from the correct context
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    // 1. Checking the password matches
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("The passwords do not match!");
    }

    // 2. Password length check (Soba Base requires at least 6 characters)
    if (passwordRef.current.value.length < 6) {
      return setError("The password must be 6 characters or more.");
    }

    try {
      setError("");
      setMessage("");
      setLoading(true);

      // 3. Send data to Supabase
      const { error: supabaseError } = await signup(
        emailRef.current.value,
        passwordRef.current.value,
      );

      if (supabaseError) throw supabaseError;

      setMessage(
        "Account created successfully! Please check your email to confirm.",
      );
    } catch (err) {
      setError(err.message || "Account creation failed, please try again.");
    }

    setLoading(false);
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card className="shadow-sm">
          <Card.Body>
            <h2 className="text-center mb-4">Create a new account</h2>
            {error && (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            )}
            {message && (
              <Alert variant="success" className="text-center">
                {message}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>

              <Form.Group id="password" className="mb-3">
                <Form.Label>password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>

              <Form.Group id="password-confirm" className="mb-4">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>

              <Button disabled={loading} className="w-100" type="submit">
                {loading
                  ? "Registration in progress..."
                  : "Register a new account"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-3">
          Already have an account?<Link to="/login">Login</Link>
        </div>
      </div>
    </Container>
  );
}
export default Signup;
