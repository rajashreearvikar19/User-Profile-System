import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For extended DOM matchers
import App from "./App";

describe("App", () => {
  it("renders without crashing", () => {
    const { getByPlaceholderText } = render(<App />);
    const searchInput = getByPlaceholderText("🔍 search user...");
    expect(searchInput).toBeInTheDocument();
  });
});
