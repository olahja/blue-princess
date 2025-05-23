<script>
    import { quadIn, quadOut, elasticOut } from "svelte/easing";
    import { fade, fly } from "svelte/transition";
    import {shuffleArray} from "./helpers.svelte.js"

    let { roomPics, draftSettings, baseSpeed, roomData, confirmCallback, draftedRooms } =
        $props();

    function scrollIntoView(event) {
        event.currentTarget.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
        });
    }

    function handleRoomClick(event, key) {
        selectedRoom = key;
        scrollIntoView(event);
    }

    let selectedRoom = $state();

    let images = $derived(shuffleArray(
        Object.entries(roomPics).map(([path, src]) => ({
            title: path,
            src: src,
            alt: path,
            key: path.split("/").at(-1).replace(".png", ""),
        })).filter(d => draftSettings.draftable.includes(d.key) && !draftedRooms.includes(d.key)).slice(0, 3))
    );
</script>

<div
    class="container"
    in:fly|global={{
        y: -600,
        duration: baseSpeed,
        delay: 0,
        easing: elasticOut,
    }}
    out:fly|global={{
        y: 600,
        duration: baseSpeed * 0.75,
        delay: baseSpeed * 0.2,
        easing: quadOut,
    }}
>
    <div class="room-selector-container">
        <h1>Draft room</h1>
        <div class="room-container">
            {#each images as image}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                <figure
                    class:selected={selectedRoom == image.key}
                    onclick={(e) => handleRoomClick(e, image.key)}
                >
                    <img src={image.src} alt={image.alt} />
                    <figcaption>
                        <h2>{roomData[image.key].name}</h2>
                        <span style:font-style="italic"
                            >{roomData[image.key].desc || "description"}</span
                        >
                    </figcaption>
                </figure>
            {/each}
        </div>
        <div class="button-container">
            <button
                disabled={selectedRoom == undefined}
                onclick={() => confirmCallback(selectedRoom)}>Confirm</button
            >
        </div>
    </div>
</div>

<style>
    .container {
        width: 100%;
        height: 100%;
        padding: 1rem;
        position: absolute;
        /* display: flex;
        justify-content: center; */
    }
    .room-selector-container {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 5px;
        padding: 10px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        text-align: center;
        line-height: 1;
        /* width: 100%; */
    }

    .room-container {
        display: flex;
        overflow-x: scroll;
        gap: 10px;
        /* margin: 0 auto; */
        /* justify-content: center; */
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
        width: 162px;
        flex-shrink: 0;
        margin: 0 auto;
        margin-bottom: 14px;
        &.selected {
            border: 4px solid #90ee90;
        }
    }
    figcaption {
        padding: 10px 6px;
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
