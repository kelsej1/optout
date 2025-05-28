import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const e = searchParams.get("email");
    if (e) setEmail(e);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(
        "https://bhek6yajdg.execute-api.eu-west-2.amazonaws.com/unsubscribe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      setSubmitted(true);
    } catch (error) {
      console.error("Unsubscribe failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
        {/* Logo */}
        <img
          src="https://powermail.s3.amazonaws.com/Tyrolit-Logo.svg.png"
          alt="Tyrolit Logo"
          style={{ width: "200px", marginBottom: "40px" }}
        />

        {/* Message */}
        {!submitted ? (
          <>
            <h2 style={{ fontWeight: "normal" }}>We’re sorry to see you go.</h2>
            <p>
              If you'd prefer not to receive further messages from us, confirm
              your email below.
            </p>

            <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Your email"
                style={{
                  padding: "12px",
                  width: "80%",
                  maxWidth: "400px",
                  fontSize: "16px",
                  marginBottom: "20px",
                  border: "none",
                }}
              />
              <br />
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "12px 24px",
                  backgroundColor: loading ? "#444" : "#008bd2",
                  color: "#ffffff",
                  fontSize: "16px",
                  border: "2px solid #008bd2",
                  borderRadius: "4px",
                  cursor: loading ? "default" : "pointer",
                }}
              >
                {loading ? "Unsubscribing..." : "Unsubscribe Me"}
              </button>
            </form>
          </>
        ) : (
          <p style={{ fontSize: "18px", marginTop: "60px", color: "#00ffcc" }}>
            You've been unsubscribed. Thank you.
          </p>
        )}

        {/* Footer */}
        <div style={{ marginTop: "60px", fontSize: "12px", color: "#888888" }}>
          © 2025 Tyrolit – Schleifmittelwerke Swarovski AG & Co K.G. All rights
          reserved.
        </div>
      </div>
    </div>
  );
}
