import { it, expect } from "vitest"
import { searchImages } from "../src/lib/imageFetchService"

// Test returns fail. 

it('Checks if returns promise', () => {

    expect(searchImages("sports", 1)).toBe(
        typeof Promise
    )
})