<script>
    import sofia from "./assets/characters/sofia.png";

    const images = import.meta.glob("./assets/rooms/*.{png,jpg,jpeg,svg}", {
        eager: true,
        as: "url",
    });
    const imageList = Object.entries(images).map(([path, url]) => ({
        path,
        url,
    }));
    $inspect(images);
</script>

<main>
    <img src={sofia} alt="Description of my image" />
    {#each imageList as img}
        <img src={img.url} alt={img.path} />
    {/each}
</main>

<style>
</style>
