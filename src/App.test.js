import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/nav/navbar/Navbar";
import Footer from "./components/footer/Footer";

describe("Home", () => {
    it("renders welcome message", () => {
        render(
            <Router>
                <Home />
            </Router>
        );
        expect(screen.getByText("Welcome to GenUML")).toBeInTheDocument();
    });

    it("renders sub heading message", () => {
        render(
            <Router>
                <Home />
            </Router>
        );
        expect(screen.getByText("Generate your Use Case diagram in only in 3 steps..")).toBeInTheDocument();
    });
});

describe("Navbar", () => {
    it("renders for navbar header", () => {
        render(
            <Router>
                <Navbar />
            </Router>
        );
        expect(screen.getByText("GenUML")).toBeInTheDocument();
    });

    it("renders generate option", () => {
        render(
            <Router>
                <Navbar />
            </Router>
        );
        expect(screen.getByText("Generate")).toBeInTheDocument();
    });
});

describe("Footer", () => {
    it("renders footer message", () => {
        render(
            <Router>
                <Footer />
            </Router>
        );
        expect(screen.getByText("Team Syndicate")).toBeInTheDocument();
    });

    it("renders copyright message", () => {
        render(
            <Router>
                <Footer />
            </Router>
        );
        expect(screen.getByText(/Copyright/)).toBeInTheDocument();
    });
});
