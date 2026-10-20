import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              backgroundColor: "#141414",
              color: "#fff",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <h1
              style={{
                fontSize: "2.5rem",
                marginBottom: "1rem",
                color: "#e50914",
              }}
            >
              Something went wrong
            </h1>
            <p style={{ color: "#aaa", marginBottom: "2rem" }}>
              Sorry, an unexpected error occurred. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: "#e50914",
                color: "#fff",
                border: "none",
                padding: "0.8rem 1.6rem",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              Reload Page
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
