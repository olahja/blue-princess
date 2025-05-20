<script>
    import { quadIn, quadOut, elasticOut } from "svelte/easing";
    import { fade, fly } from "svelte/transition";
    import CharacterCreator from "./CharacterCreator.svelte";
    let { characterCreation, enterOpts, updateGameState, baseSpeed } = $props();
    const mainCharacterPics = import.meta.glob(
        "../assets/characters/main/*.{png,jpg,jpeg,svg}",
        {
            eager: true,
            as: "url",
        },
    );
    const sidekickPics = import.meta.glob(
        "../assets/characters/sidekick/*.{png,jpg,jpeg,svg}",
        {
            eager: true,
            as: "url",
        },
    );
</script>

{#if characterCreation.selectedCharacter == undefined}
    <div
        class="character-creator-container"
        in:fly|global={{
            y: -600,
            duration: baseSpeed * 2,
            delay: enterOpts.outDuration,
            easing: elasticOut,
        }}
        out:fly|global={{
            y: 600,
            duration: baseSpeed * 0.75,
            delay: baseSpeed * 0.2,
            easing: quadOut,
        }}
    >
        <CharacterCreator
            characters={mainCharacterPics}
            heading={"Pick your character:"}
            confirmCallback={(d) => (characterCreation.selectedCharacter = d)}
        />
    </div>
{/if}
{#if characterCreation.selectedCharacter !== undefined && characterCreation.selectedSidekick == undefined}
    <div
        class="character-creator-container"
        in:fly|global={{
            y: -600,
            duration: baseSpeed * 2,
            delay: baseSpeed * 0.2 + baseSpeed * 0.750,
            easing: elasticOut,
        }}
        out:fly|global={{
            y: 600,
            duration: baseSpeed * 0.750,
            delay: baseSpeed * 0.200,
            easing: quadOut,
        }}
    >
        <CharacterCreator
            characters={sidekickPics}
            heading={"Pick your sidekick:"}
            confirmCallback={(d) => {
                characterCreation.selectedSidekick = d;
                updateGameState("promptBegin", true);
            }}
        />
    </div>
{/if}

<style>
    .character-creator-container {
        width: 100%;
        height: 100%;
        padding: 1rem;
        position: absolute;
    }
</style>
