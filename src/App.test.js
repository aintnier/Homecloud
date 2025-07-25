import { render } from "@testing-library/react";
import App from "./App";

test("renders without crashing", () => {
  render(<App />);
});

test("renders main content", () => {
  const { container } = render(<App />);
  // Verifica che l'app si renderizzi correttamente
  expect(container).toBeInTheDocument();
});

test("app contains content", () => {
  const { container } = render(<App />);
  // Verifica che ci sia del contenuto nel DOM
  expect(container.firstChild).toBeTruthy();
});
