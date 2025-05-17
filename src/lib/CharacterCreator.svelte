<script>
    let index = $state(0);

    
    let {characters, heading} = $props();

    const characterDescriptions = {
        cleaner: {
            name: "The New-Fridge-Lover",
            desc: "Loves her new fridge almost as much as she loves solving puzzles.",
        },
        gardner: {
            name: "The Gardner",
            desc: "Loves flowers. And puzzles. And flowers. And puzzles.",
        },
        puzzle_solver: {
            name: "The Puzzle Solver",
            desc: "Master at solving even the hardest of puzzles.",
        },
        pyro: {
            name: "The Pyromaniac",
            desc: "He didn't start the fire... did he?",
        },
        professor: {
            name: "The Professor",
            desc: "He will find the cure for baldness. At any cost.",
        },
        samurai: {
            name: "The Samurai",
            desc: "Not to be messed with.",
        },
    };
    $inspect({ characters });
    const characterList = Object.entries(characters).map(([path, src]) => ({
        title: path,
        src: src,
        alt: path,
        key: path.split("/").at(-1).replace(".png", ""),
    }));
    const images = characterList;

    function scrollIntoView(event) {
		event.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
	}

    let selectedCharacter = $state()

    function handleCharacterClick(event, key) {
        selectedCharacter = key
        scrollIntoView(event)

    }

    $inspect({ images });
</script>

<div class="car-container">
    <h1>{heading}</h1>
    <div class="character-container">
        {#each images as image}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <figure class:selected={selectedCharacter == image.key} onclick={(e) => handleCharacterClick(e, image.key)}>
                <img src={image.src} alt={image.alt} />
                <figcaption>
                    <h2>{characterDescriptions[image.key].name}</h2>
                    <span style:font-style="italic">{characterDescriptions[image.key].desc}</span>
                </figcaption>
            </figure>
        {/each}
    </div>
    <div class="button-container">
        <button disabled={selectedCharacter == undefined}>Confirm</button>
    </div>
</div>

<!-- <Carousel bind:index>
    
        
    <Indicators position="withThumbnails" />
    <Thumbnails {images} bind:index />
    </Carousel> -->

<style>
    .character-container {
        display: flex;
        overflow-x: scroll;
        gap: 10px;
    }
    .button-container {
        margin-top: 10px;
    }
    
    figure {
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid #ccc;
        backdrop-filter: blur(22px);
        -webkit-backdrop-filter: blur(22px);
        min-width: 280px;
        margin: 0;
        margin-bottom: 14px;
        &.selected {
            border: 4px solid #90EE90;
        }

    }
    figcaption {
        padding: 10px 6px;
    }
    .car-container {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 5px;
        padding: 10px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        text-align: center;
        line-height: 1;
    }
    h2 {
        margin: 0;
        margin-bottom: 5px;
        line-height: 1;
        font-size: 18px;
    }
    h1 {
        font-size: 24px;
    }
    img {
        width: 100%;
    }
</style>
