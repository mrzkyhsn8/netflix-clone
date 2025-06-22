import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // update state agar fallback UI ditampilkan
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // bisa log ke server juga di sini
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <h2>Terjadi kesalahan.</h2>;
    }

    return this.props.children;
  }
}
