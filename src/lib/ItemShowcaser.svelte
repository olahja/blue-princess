<script>
    import { quadIn, quadOut, elasticOut } from "svelte/easing";
    import { fade, fly } from "svelte/transition";
    import Inventory from "./Inventory.svelte";

    const itemPics = import.meta.glob("../assets/items/*.{png,jpg,jpeg,svg}", {
        eager: true,
        as: "url",
    });
    let { item, baseSpeed, closeItemShowcase, inventory, updateGameState } = $props();

    let itemSrc = $derived(itemPics[`../assets/items/${item.id}.png`]);

    $inspect({ itemPics });
    // let image = $derived()
    let slots = $state([
        {
            id: "ice_lock",
            top: "18%",
            left: "45%",
            item: null,
            correctItem: "ice_key",
        },
        {
            id: "gem_lock",
            top: "40%",
            left: "45%",
            item: null,
            correctItem: "gem_key",
        },
        {
            id: "code_lock",
            top: "61%",
            left: "45%",
            item: null,
            correctItem: "secret_code",
        },
    ]);

    let allCorrectItems = $derived.by(() => {
        return slots
            .map((d) => d.item && d.correctItem == d.item.id)
            .every((d) => d == true);
    });

    $inspect({ allCorrectItems });

    let selectedSlot = $state();
    function handleSlotClick(slot) {
        selectedSlot = slot;
    }

    $inspect({ slots });
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
        <h1>Secret found!</h1>
        <div class="room-container">
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <figure class:big={item.id == "secret_door"}>
                {#if item.id == "secret_door"}
                    {#if !allCorrectItems}
                        <div
                            class="container"
                            out:fade|global={{
                                duration: baseSpeed * 4,
                                easing: quadOut,
                            }}
                        >
                            {#each slots as d, i}
                                <!-- svelte-ignore a11y_consider_explicit_label -->
                                <button
                                    class="slot"
                                    class:selected={selectedSlot &&
                                        d.id == selectedSlot?.id}
                                    style:top={d.top}
                                    style:left={d.left}
                                    onclick={() => handleSlotClick(d)}
                                >
                                    {#if d.item}
                                        <!-- svelte-ignore a11y_missing_attribute -->
                                        <img
                                            src={itemPics[
                                                `../assets/items/${d.item.id}.png`
                                            ]}
                                        />
                                    {/if}
                                </button>
                            {/each}
                            {#if selectedSlot && inventory.length > 1}
                                <div class="inventory-container">
                                    {#each inventory as d}
                                        <!-- svelte-ignore a11y_consider_explicit_label -->
                                        <button
                                            class="inventory-item"
                                            onclick={() =>
                                                (selectedSlot.item = d)}
                                        >
                                            <!-- svelte-ignore a11y_missing_attribute -->
                                            <img
                                                src={itemPics[
                                                    `../assets/items/${d.id}.png`
                                                ]}
                                            />
                                        </button>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    {:else}
                        <div
                            class="enter-container"
                            in:fade|global={{
                                
                                delay: baseSpeed * 4,
                                duration: baseSpeed * 3,
                                easing: quadOut,
                            }}
                        >
                        <button class="enter-button" onclick={() => updateGameState("endGame", true)}>Enter</button>
                    </div>
                    {/if}
                {/if}
                <img src={itemSrc} />
                <figcaption>
                    <h2>{item.name}</h2>
                    <span style:font-style="italic"
                        >{item.desc || "description"}</span
                    >
                </figcaption>
            </figure>
        </div>
        <div class="button-container">
            <button onclick={closeItemShowcase}>Close</button>
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
    .enter-container {
        position: absolute;
        top: 40%;
        left: 55%;
        transform: translate(-50%, -50%)

    }
    .slot {
        position: absolute;
        height: 40px;
        padding: 0;
        overflow: hidden;
        width: 40px;
        background: rgba(255, 255, 255, 0.2);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        &.selected {
            border: 1px solid #90ee90;
        }
    }
    .inventory-item {
        margin: 0;
        padding: 0;
        width: 40px;
    }
    .inventory-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
        position: absolute;
        left: 70%;
        top: 15%;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 5px;
        padding: 10px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
        border: 1px solid rgba(255, 255, 255, 0.3);
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
        border-radius: 4px;
        border: 1px solid #ccc;
        backdrop-filter: blur(22px);
        -webkit-backdrop-filter: blur(22px);
        width: 162px;
        flex-shrink: 0;
        margin: 0 auto;
        margin-bottom: 14px;
        position: relative;
        &.selected {
            border: 4px solid #90ee90;
        }
        &.big {
            width: 100%;
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
