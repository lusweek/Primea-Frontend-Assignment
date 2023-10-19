import { it, expect } from "vitest"
import { setPageNumber } from '../src/routes/+page.svelte'

// Test returns fail
// TypeError: setPageNumber is not a function. 

it('setPageNumber se om den kan hitta nummret', () => {

    expect(setPageNumber(
        "https://api.unsplash.com/search/photos?page=1",
        "page"
        )).toBe(1)
})