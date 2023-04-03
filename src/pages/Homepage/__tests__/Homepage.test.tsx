import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Homepage } from "../Homepage"
import { BrowserRouter as Router } from "react-router-dom"

describe("Homepage component", () => {
    it("should display name of app", ()=> {
        render(<Homepage />, { wrapper : Router})
        const appName = screen.getByText(/Space Image Application/i)
        expect(appName).toBeDefined()
    })

    it("should display login link", ()=> {
        render(<Homepage />, { wrapper : Router})
        const login = screen.getByText(/Log In/i)
        expect(login).toBeDefined()
    })

    it("should display signup link", ()=> {
        render(<Homepage />, { wrapper : Router})
        const signup = screen.getByText(/Sign Up/i)
        expect(signup).toBeDefined()
    })

    it("should display guest link", ()=> {
        render(<Homepage />, { wrapper : Router})
        const guest = screen.getByText(/Continue as Guest/i)
        expect(guest).toBeDefined()
    })
})