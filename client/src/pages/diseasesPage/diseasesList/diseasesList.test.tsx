import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import DiseaseList from "./diseasesList";

vi.mock("../../../store/diseasesStore", () => ({
  useDiseasesStore: () => ({
    diseases: [
      { id: 1, title: "Грипп" },
      { id: 2, title: "ОРВИ" },
    ],
  }),
}));

describe("DiseaseList", () => {
  it("рендерит список болезней", () => {
    render(<DiseaseList />);

    expect(screen.getByText("Грипп")).toBeInTheDocument();
    expect(screen.getByText("ОРВИ")).toBeInTheDocument();
  });
});
