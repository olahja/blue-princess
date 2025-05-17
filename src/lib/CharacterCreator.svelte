<script>
    let index = $state(0);

    const mainCharacters = import.meta.glob(
        "../assets/characters/main/*.{png,jpg,jpeg,svg}",
        {
            eager: true,
            as: "url",
        },
    );
    const characterDescriptions = {
        cleaner: {
            name: "The Cleaner",
            desc: "Coming soon...",
        },
        gardner: {
            name: "The Gardner",
            desc: "Coming soon...",
        },
        puzzle_solver: {
            name: "The Puzzle Solver",
            desc: "Master at solving even the hardest of puzzles.",
        },
    };
    $inspect({ mainCharacters });
    const mainCharacterList = Object.entries(mainCharacters).map(
        ([path, src]) => ({
            title: path,
            src: src,
            alt: path,
            key: path.split("/").at(-1).replace(".png", ""),
        }),
    );
    const images = mainCharacterList;

    $inspect({ images });
</script>

<div class="car-container">
    {#each images as image}
        <figure>
            <img src={image.src} alt={image.alt} />
            <figcaption>
                <h2>{characterDescriptions[image.key].name}</h2>
                <span>{characterDescriptions[image.key].desc}</span>
            </figcaption>
        </figure>
    {/each}
</div>

<!-- <Carousel bind:index>
    
        
    <Indicators position="withThumbnails" />
    <Thumbnails {images} bind:index />
    </Carousel> -->

<style>
    figure {
        border-radius: 4px;
        border: 1px solid #ccc;
        backdrop-filter: blur(22px);
        -webkit-backdrop-filter: blur(22px);
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
    }
    h2 {
        margin: 0;
        margin-bottom: 5px;
        line-height: 1;
    }
    img {
        width: 100%;
    }
</style>
