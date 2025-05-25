<script>
  import { quadIn, quadOut, elasticOut } from "svelte/easing";
  // import Test from "./Test.svelte";
  import background from "./assets/background/background_plain.png";
  import { fade, fly } from "svelte/transition";
  import Decorations from "./lib/Decorations.svelte";
  import _roomData from "./data/rooms.json";
  import Intro from "./lib/Intro.svelte";
  import ItemShowcaser from "./lib/ItemShowcaser.svelte";

  import CharacterCreatorWrapper from "./lib/CharacterCreatorWrapper.svelte";
  import DraftWindow from "./lib/DraftWindow.svelte";

  // let enterOpts = {
  //   inDelay: 1000,
  //   inDuration: 8000,
  //   outDuration: 2000,
  // };

  const baseSpeed = 100;

  let enterOpts = {
    inDelay: baseSpeed * 2,
    inDuration: baseSpeed * 4,
    outDuration: baseSpeed * 2,
  };

  let introOver = $state(false);
  let characterCreation = $state({
    active: false,
    selectedCharacter: undefined,
    selectedSidekick: undefined,
  });
  let gameState = $state({
    promptBegin: false,
    begun: true,
    explore: false,
  });

  function updateGameState(key, value) {
    gameState[key] = value;
  }

  const roomPics = import.meta.glob("./assets/rooms/*.{png,jpg,jpeg,svg}", {
    eager: true,
    as: "url",
  });

  let selectedRoom = $state("outside");

  let roomData = $state(_roomData);

  let currentBackground = $derived(
    selectedRoom == "outside"
      ? background
      : roomPics[`./assets/rooms/${selectedRoom}.png`],
  );
  // $inspect({ rooms });

  function updateRoomData(roomKey) {
    roomData[roomKey];
  }

  let draftSettings = $state();

  let draftedRooms = $state(["stairwell"]);

  function updateSelectedRoom(room) {
    selectedRoom = room;
  }

  function updateDraftSettings(draftable, direction) {
    draftSettings = { draftable: draftable, direction: direction };
  }
  function draftRoom(room) {
    roomData[selectedRoom].connections.find(
      (d) => d.direction == draftSettings.direction,
    ).drafted = room;
    draftedRooms.push(room);
    draftSettings = undefined;
    selectedRoom = room;
  }

  let inventory = $state([]);
  function getItem(item) {
    roomData[selectedRoom].secrets.find((d) => d.id == item.id).found = true;
    inventory.push(item);
  }

  let showcaseItem = $state();
  function closeItemShowcase() {
    showcaseItem = undefined;
  }

  // console.log({mainCharacters: mainCharacterPics})
</script>

<!-- <Test /> -->
<main>
  <div
    class="background-container"
    class:centered={selectedRoom == "kitchen"}
    style:background-image="url({currentBackground})"
  >
    <!-- svelte-ignore a11y_img_redundant_alt -->

    {#if !introOver}
      <Intro {enterOpts} />
    {/if}
    <!-- <div class="cc-outer"> -->
    {#if characterCreation.active}
      <CharacterCreatorWrapper
        {baseSpeed}
        {characterCreation}
        {enterOpts}
        {updateGameState}
      />
    {/if}
    {#if gameState.explore && !draftSettings}
      <Decorations
        {selectedRoom}
        {roomData}
        {updateRoomData}
        {updateDraftSettings}
        {updateSelectedRoom}
        {getItem}
      />
    {/if}
    {#if draftSettings}
      <DraftWindow
        {roomPics}
        {draftSettings}
        {baseSpeed}
        {roomData}
        confirmCallback={draftRoom}
        {draftedRooms}
      />
    {/if}
    {#if showcaseItem}
      <ItemShowcaser item={showcaseItem} {baseSpeed} />
    {/if}
  </div>
  <!-- </div> -->
  {#if !introOver}
    <div
      class="button-container"
      in:fade|global={{
        duration: baseSpeed,
        delay: enterOpts.inDuration + enterOpts.inDelay,
        easing: quadIn,
      }}
      out:fade|global={{
        duration: baseSpeed,
        easing: quadOut,
      }}
    >
      <button
        color="blue"
        onclick={() => {
          introOver = true;
          characterCreation.active = true;
        }}>Start</button
      >
    </div>
  {/if}
  {#if gameState.promptBegin}
    <div
      class="button-container"
      in:fade|global={{
        duration: baseSpeed,
        delay: baseSpeed,
        easing: quadIn,
      }}
      out:fade|global={{
        duration: baseSpeed * 0.2,
        easing: quadOut,
      }}
    >
      <button
        color="blue"
        onclick={() => {
          gameState.promptBegin = false;
          selectedRoom = "stairwell";
          gameState.explore = true;
        }}>Enter</button
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
    overflow-x: hidden;
  }
  .button-container {
    display: flex;
    justify-content: center;
  }

  .background-container {
    background-size: cover;
    background-position: center;
    position: relative;
    max-width: 400px;
    height: 600px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  .centered {
    background-position: right !important;
  }
</style>
