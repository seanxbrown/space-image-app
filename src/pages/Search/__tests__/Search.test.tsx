import { describe, it, expect } from "vitest"
import { screen, render, getByLabelText } from "@testing-library/react"
import { Search } from "../Search"
import { BrowserRouter as Router } from "react-router-dom"

describe("Search Page", () => {
    it("should display title", () => {
        render(<Search />)
        const title = screen.getByText(/Search/i)
        expect(title).toBeDefined()
    })

    it("should display random button", () => {
        render(<Search />)
        const randomButton = screen.getByText(/Random Image/i)
        expect(randomButton).toBeDefined()
    })

    it("should display today button", () => {
        render(<Search />)
        const todayButton = screen.getByText(/Today's Image/i)
        expect(todayButton).toBeDefined()
    })

})