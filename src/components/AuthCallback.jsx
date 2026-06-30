import { useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../supabaseClient";
import { Spinner, Container } from "react-bootstrap";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Make sure that Suba Base successfully captured the session from the link.
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // If confirmed successfully, move it to the main page immediately.
        navigate("/", { replace: true });
      } else {
        // If an error occurs, return to the login page.
        navigate("/login", { replace: true });
      }
    });
  }, [navigate]);

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Spinner animation="border" variant="primary" className="mb-3" />
      <h4>Your account is being confirmed and activated, just a moment...</h4>
    </Container>
  );
}

export default AuthCallback;
