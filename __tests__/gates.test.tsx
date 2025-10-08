import { render } from "@testing-library/react-native";

import GateScreen from "@/app/(tabs)/gates";

describe("GateScreen", () => {
  it("renders initial screen correctly", () => {
    const { getByText } = render(<GateScreen />);
    expect(getByText("Gates")).toBeTruthy();
    expect(getByText("No gates available")).toBeTruthy();
  });

  it("matches snapshot", () => {
    const screen = render(<GateScreen />);
    expect(screen).toMatchSnapshot();
  });
});
