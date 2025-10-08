import { render } from "@testing-library/react-native";

import RoutesScreen from "@/app/(tabs)/routes";

describe("RoutesScreen", () => {
  it("renders initial screen correctly", () => {
    const { getByText } = render(<RoutesScreen />);

    expect(getByText("Previous Routes")).toBeTruthy();
    expect(getByText("No previous routes available")).toBeTruthy();
  });

  it("matches snapshot", () => {
    const screen = render(<RoutesScreen />);
    expect(screen).toMatchSnapshot();
  });
});
