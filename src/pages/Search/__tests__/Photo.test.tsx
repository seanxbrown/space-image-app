import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import { Photo } from "../Photo";

const testObj = {
    "date": "2023-04-05",
    "explanation": "In this Hubble Space Telescope image the bright, spiky stars lie in the foreground toward the heroic northern constellation Perseus and well within our own Milky Way galaxy. In sharp focus beyond is UGC 2885, a giant spiral galaxy about 232 million light-years distant. Some 800,000 light-years across compared to the Milky Way's diameter of 100,000 light-years or so, it has around 1 trillion stars. That's about 10 times as many stars as the Milky Way. Part of an investigation to understand how galaxies can grow to such enormous sizes, UGC 2885 was also part of An Interesting Voyage and astronomer Vera Rubin's pioneering study of the rotation of spiral galaxies. Her work was the first to convincingly demonstrate the dominating presence of dark matter in our universe.",
    "hdurl": "https://apod.nasa.gov/apod/image/2304/RubinsGalaxy_hst2000.jpg",
    "media_type": "image",
    "service_version": "v1",
    "title": "Rubin's Galaxy",
    "url": "https://apod.nasa.gov/apod/image/2304/RubinsGalaxy_hst1024.jpg",
    "id": "wududueh2",
    "isDeleted": false
  }

describe("Photo component", () => {
    it("should display the image passed into it", () => {
        render(<Photo imgObject={testObj}/>)
        const image = screen.getByAltText(testObj.title)
        expect(image).toBeDefined()

        
    })
})