<script>
    import { searchImages } from '$lib/imageFetchService.js'
    import Loader from '../lib/Loader.svelte';

    let searchWord = '';
    let prevSearchWord = ''
    let firstSearch = true
    let isLoading = false
    let axiosError
    let pageNr

    let response = {}
    let results = [];

    async function handleSearchImages(pageNr) {
      isLoading = true
      prevSearchWord = searchImages
        try {
          response = await searchImages(searchWord, pageNr);
          setPageNumber(response.config.url, "page")
          results = response.data.results
        } catch (error) {
          axiosError = error
          console.error('Error searching for images:', error);
        } finally {
          isLoading = false
          firstSearch = false
        }
    }

    export function setPageNumber(url, param) {
      const params = new URL(url).searchParams;
      let pageNrString = params.get(param) 
      pageNr = parseInt(pageNrString) // Converts from string to number
    }


</script>

<article class="w-screen min-h-[200px] flex items-center flex-col m-10">
  <div class="flex gap-4 m-10">
    <input class="input input-bordered w-full max-w-xs" bind:value={searchWord} placeholder="Search for images" />
    <button on:click={() => handleSearchImages(1)} class="btn btn-primary">Search</button>
  </div>
  <div>
    <div class="w-screen flex flex-col items-center">
      {#if isLoading}
        <Loader {isLoading} />
      {/if}
      {#if results.length > 0}
      <div class="flex flex-wrap gap-4 items-center justify-center">
        {#each results as result (result.id)}
          <img class="" src={result.urls.small} alt={result.description} />
        {/each}
      </div>
      <div class="join m-10 ">
        {#if pageNr !== 1}
        <button 
          class="join-item btn btn-active" 
          on:click={() => handleSearchImages((pageNr - 1))}>{(pageNr - 1)}
        </button>
        {/if}
        <button class="join-item btn btn-disabled" >{pageNr}</button>
        <button 
          class="join-item btn" 
          on:click={() => handleSearchImages(pageNr + 1)}>{pageNr + 1}
        </button>
      </div>
      {:else if axiosError}
      <div class="flex flex-col gap-4">
        <h1 class="text-lg font-bold	">Något gick fel...</h1>
        <p>{axiosError.message}</p>
        <p>{axiosError.code}</p>
      </div>
      {:else if !firstSearch && results.length === 0}
        <p>Hittade inga bilder med sökningen "{prevSearchWord}"</p>
      {/if}
    </div>
  </div>
</article>
