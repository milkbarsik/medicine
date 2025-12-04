import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DiseaseItem from "./diseasesItem";

describe("DiseaseItem", () => {
  it("рендерит название болезни", () => {
    render(<DiseaseItem id={1} title="Грипп" />);
    expect(screen.getByText("Грипп")).toBeInTheDocument();
  });
});
