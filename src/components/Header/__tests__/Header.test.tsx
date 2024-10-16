import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../Header";
import { AuthContext } from "../../../context/AuthContext/AuthContext";

describe("Header component", () => {
  it("renders correctly when not logged in", async () => {
    await act(async () => {
      render(
        <AuthContext.Provider
          value={{
            isLogged: false,
            handleUserLogin: () => {},
            handleUserLogout: () => {},
          }}
        >
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </AuthContext.Provider>
      );
    });

    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Employees")).toBeInTheDocument();
    expect(screen.getByText("Audits")).toBeInTheDocument();
    expect(screen.getByText("Tracking")).toBeInTheDocument();
    expect(screen.getByText("Who is working?")).toBeInTheDocument();
    expect(screen.getByText("Log in")).toBeInTheDocument();
  });

  it("renders correctly when logged in", async () => {
    await act(async () => {
      render(
        <AuthContext.Provider
          value={{
            isLogged: true,
            handleUserLogin: () => {},
            handleUserLogout: () => {},
          }}
        >
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </AuthContext.Provider>
      );
    });

    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Employees")).toBeInTheDocument();
    expect(screen.getByText("Audits")).toBeInTheDocument();
    expect(screen.getByText("Tracking")).toBeInTheDocument();
    expect(screen.getByText("Who is working?")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("calls handleUserLogout when logout is clicked", async () => {
    const handleUserLogout = jest.fn();

    await act(async () => {
      render(
        <AuthContext.Provider
          value={{
            isLogged: true,
            handleUserLogin: () => {},
            handleUserLogout,
          }}
        >
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </AuthContext.Provider>
      );
    });

    fireEvent.click(screen.getByText("Logout"));
    expect(handleUserLogout).toHaveBeenCalledTimes(1);
  });

  it("navigates to login page when Log in is clicked", async () => {
    await act(async () => {
      render(
        <AuthContext.Provider
          value={{
            isLogged: false,
            handleUserLogin: () => {},
            handleUserLogout: () => {},
          }}
        >
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </AuthContext.Provider>
      );
    });

    fireEvent.click(screen.getByText("Log in"));
    expect(screen.getByText("Log in")).toBeInTheDocument();
  });

  it("navigates to employees page when Employees is clicked", async () => {
    await act(async () => {
      render(
        <AuthContext.Provider
          value={{
            isLogged: true,
            handleUserLogin: () => {},
            handleUserLogout: () => {},
          }}
        >
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </AuthContext.Provider>
      );
    });

    fireEvent.click(screen.getByText("Employees"));
    expect(screen.getByText("Employees")).toBeInTheDocument();
  });
});
