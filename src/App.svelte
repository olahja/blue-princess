<script>
  import { quadIn, quadOut, elasticOut } from "svelte/easing";
  import Test from "./Test.svelte";
  import background from "./assets/background/background_plain.png";
  import title from "./assets/background/title.png";
  import { fade, fly } from "svelte/transition";
  import CharacterCreator from "./lib/CharacterCreator.svelte";

  let enterOpts = {
    inDelay: 1000,
    inDuration: 8000,
    outDuration: 2000,
  };
  // let enterOpts = {
  //   inDelay: 100,
  //   inDuration: 800,
  //   outDuration: 200,
  // };

  let introOver = $state(false);
  let characterCreation = $state({
    hasStarted: false,
  });

  const mainCharacters = import.meta.glob(
    "./assets/characters/main/*.{png,jpg,jpeg,svg}",
    {
      eager: true,
      as: "url",
    },
  );
  const sidekicks = import.meta.glob(
    "./assets/characters/sidekick/*.{png,jpg,jpeg,svg}",
    {
      eager: true,
      as: "url",
    },
  );
</script>

<!-- <Test /> -->
<main>
  <div class="background-container" style:background-image="url({background})">
    <!-- svelte-ignore a11y_img_redundant_alt -->

    {#if !introOver}
      <div
        class="title"
        in:fade|global={{
          duration: enterOpts.inDuration,
          delay: enterOpts.inDelay,
          easing: quadIn,
        }}
        out:fade|global={{
          duration: enterOpts.outDuration,
          easing: quadOut,
        }}
      >
        <img src={title} alt="Description of my image" />
        <span>– a very short minigame</span>
      </div>
    {/if}
    {#if characterCreation.hasStarted}
      <div
        class="character-creator-container"
        in:fly|global={{
          y: -600,
          duration: 2000,
          delay: enterOpts.outDuration,
          easing: elasticOut,
        }}
        out:fly|global={{
          y: 600,
          duration: 750,
          delay: enterOpts.outDuration,
          easing: quadIn,
        }}
      >
        <CharacterCreator characters={mainCharacters} heading={"Pick your character:"} />
        <!-- <CharacterCreator characters={sidekicks} heading={"Pick your sidekick:"} /> -->
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
    text-align: center;
    font-style: italic;
    line-height: 1;
    img {
      width: 100%;
    }
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
    height: 600px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
</style>
