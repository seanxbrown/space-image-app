import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Navigation } from "../Navigation"

describe("Navigation Component", () => {
    it("Should display brand text", () => {
        render(<Navigation/>)
        const brandText = screen.getByText(/Space Images/)
        expect(brandText).toBeDefined()

    })
    it("Should display home text", () => {
        render(<Navigation/>)
        const brandText = screen.getByText(/Home/)
        expect(brandText).toBeDefined()

    })
    it("Should display gallery text", () => {
        render(<Navigation/>)
        const brandText = screen.getByText(/Galleries/)
        expect(brandText).toBeDefined()

    })

})