import { describe, it, expect } from "vitest"
import { screen, render, getByLabelText } from "@testing-library/react"
import { Search } from "../Search"
import { BrowserRouter as Router } from "react-router-dom"

describe("Search Page", () => {
    it("should display title", () => {
        render(<Search />)
        const title = screen.getByText("Search")
        expect(title).toBeDefined()
    })

})