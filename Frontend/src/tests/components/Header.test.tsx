import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";
import { MemoryRouter } from "react-router-dom";

// Mock AuthContext's useAuth hook
jest.mock("../../context/AuthContext.tsx", () => ({
  useAuth: jest.fn(),
}));

describe("Header component", () => {
  test("renders Login and Signup when not logged in", () => {
    // Mock useAuth to return the logged out state
    (useAuth as jest.Mock).mockReturnValue({
      isLoggedIn: false,
      logout: jest.fn(),
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    // Verify that Login and Signup links are displayed
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Signup/i)).toBeInTheDocument();
    expect(screen.queryByText(/GO-TO-Chat/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument();
  });

  test("renders GO-TO-Chat and Logout when logged in", () => {
    // Mock useAuth to return the logged in state
    (useAuth as jest.Mock).mockReturnValue({
      isLoggedIn: true,
      logout: jest.fn(),
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    // Verify that GO-TO-Chat and Logout links are displayed
    expect(screen.getByText(/GO-TO-Chat/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
    expect(screen.queryByText(/Login/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Signup/i)).not.toBeInTheDocument();
  });

  test("calls logout function when Logout is clicked", () => {
    const mockLogout = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      isLoggedIn: true,
      logout: mockLogout,
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const logoutButton = screen.getByText(/Logout/i);
    fireEvent.click(logoutButton);

    // Ensure logout function is called
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
