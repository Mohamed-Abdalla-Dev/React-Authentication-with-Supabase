import { useState } from "react";
import { Card, Button, Alert, Container } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router";

function Dashboard() {
  const [error, setError] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login"); // Directing him to the login page after exiting
    } catch {
      setError("Logout failed, please try again.");
    }
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "500px" }}>
        <Card className="shadow-sm text-center">
          <Card.Body>
            <h2 className="mb-4">Personal account:(Dashboard)</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <div className="mb-3 text-start bg-light p-3 rounded">
              <strong>Current email:</strong>
              <div className="text-muted mt-1">{user?.email}</div>
            </div>

            <div className="mb-4 text-start bg-light p-3 rounded">
              <strong>Unique identifier(UID):</strong>
              <div className="text-muted mt-1" style={{ fontSize: "0.85rem" }}>
                {user?.id}
              </div>
            </div>

            <Button variant="danger" className="w-100" onClick={handleLogout}>
              Log out
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default Dashboard;
