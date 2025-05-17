<script>
  import { quadIn, quadOut, elasticOut } from "svelte/easing";
  import Test from "./Test.svelte";
  import background from "./assets/background/background_plain.png";
  import title from "./assets/background/title.png";
  import { fade , fly} from "svelte/transition";
  import CharacterCreator from "./lib/CharacterCreator.svelte";

  // let enterOpts = {
  //   inDelay: 1000,
  //   inDuration: 8000,
  //   outDuration: 2000,
  // };
  let enterOpts = {
    inDelay: 100,
    inDuration: 800,
    outDuration: 200,
  };

  let introOver = $state(false);
  let characterCreation = $state({
    hasStarted: false,
  });
</script>

<!-- <Test /> -->
<main>
  <div class="background-container" style:background-image="url({background})">
    <!-- svelte-ignore a11y_img_redundant_alt -->

    {#if !introOver}
      <img
        in:fade|global={{
          duration: enterOpts.inDuration,
          delay: enterOpts.inDelay,
          easing: quadIn,
        }}
        out:fade|global={{
          duration: enterOpts.outDuration,
          easing: quadOut,
        }}
        class="title"
        src={title}
        alt="Description of my image"
      />
    {/if}
    {#if characterCreation.hasStarted}
        <div class="character-creator-container"
        in:fly|global={{
          y: -600,
          duration: 2000,
          delay: enterOpts.outDuration,
          easing: elasticOut,
        }}
        >
        
        <CharacterCreator />

        </div>
    {/if}
  </div>
  {#if !introOver}
    <div
      class="button-container"
      in:fade|global={{
        duration: 1000,
        delay: enterOpts.inDuration,
        easing: quadIn,
      }}
      out:fade|global={{
        duration: 1000,
        easing: quadOut,
      }}
    >
      <button
        color="blue"
        onclick={() => {
          introOver = true;
          characterCreation.hasStarted = true;
        }}>Start</button
      >
    </div>
  {/if}
</main>

<style>
  main {
    /* padding-top: 60px; */
    width: 100%;
    /* display: flex; */
    margin: 0 auto;
  }
  .button-container {
    display: flex;
    justify-content: center;
  }
  .title {
    width: 100%;
    position: absolute;
    top: 5%;
  }
  .character-creator-container {
    width: 100%;
    height: 100%;
    padding: 1rem;
  }

  .background-container {
    background-size: cover;
    background-position: center;
    position: relative;
    max-width: 600px;
    height: 500px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
</style>
