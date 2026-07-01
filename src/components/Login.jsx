import { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth(); // Calling the recording function from the correct context
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // A new hook to navigate to another page after successful login.

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      //Send your email and password to Supabase to log in
      const { error: supabaseError } = await login(
        emailRef.current.value,
        passwordRef.current.value,
      );

      // If Supabase returns any error (such as a wrong password), we display it immediately.
      if (supabaseError) throw supabaseError;

      // If the process is successful, immediately redirect the user to the protected homepage.
      navigate("/");
    } catch (err) {
      setError(err.message || "Email or password error.");
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
            <h2 className="text-center mb-4">Login</h2>
            {error && (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="mb-3">
                <Form.Label>Your Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>

              <Form.Group id="password" className="mb-4">
                <Form.Label>password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>

              <Button disabled={loading} className="w-100" type="submit">
                {loading ? "Logging in..." : "entrance"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-3">
          Don't have an account?<Link to="/signup">Create a new account</Link>
        </div>
      </div>
    </Container>
  );
}
