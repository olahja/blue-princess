<script>
    let { inventory } = $props();
    const itemPics = import.meta.glob("../assets/items/*.{png,jpg,jpeg,svg}", {
        eager: true,
        as: "url",
    });
    $inspect(inventory);
</script>

<div class="container">
    {#each inventory as item}
        <figure>
            <img src={itemPics[`../assets/items/${item.id}.png`]} />
            <!-- <figcaption>
                    <h2>{item.name}</h2>
                    <span style:font-style="italic"
                        >{item.desc || "description"}</span
                    >
                </figcaption> -->
        </figure>
    {/each}
</div>

<style>
    img {
        width: 30px;
        opacity: 0.8;
    }
    .container {
        position: absolute;
        top: 0;
        left: 0;
        margin-left: 10px;
        margin-top: 10px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 5px;
        padding: 10px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        /* text-align: center; */
        /* line-height: 1; */
        display: flex;
        flex-direction: column;
        /* width: 100%; */
    }
    figure {
        margin: 0;
    }
</style>
