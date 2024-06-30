import { render, screen } from "../libs/utility/test-utility/test-utils"
import Home from "../pages/Home"

test("Example 1", () => {
    render(<Home />);

    const element = screen.getByText(/class to make any table/i);

    expect(element).toBeInTheDocument();
})