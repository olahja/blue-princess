<script>
    import footsteps from "../assets/misc/footsteps.svg";
    let {
        selectedRoom,
        roomData,
        updateRoomData,
        updateDraftSettings,
        inventory,
        updateSelectedRoom,
        getItem
    } = $props();

    let connections = $derived(roomData[selectedRoom].connections);
    let secrets = $derived(roomData[selectedRoom].secrets || []);
</script>

{#each connections as c}
    <button
        class="connection"
        style:top={c.buttonPos.top}
        style:left={c.buttonPos.left}
        onclick={() =>
            c.drafted
                ? updateSelectedRoom(c.drafted)
                : updateDraftSettings(c.draftable, c.direction)}
        ><img
            style:transform="rotate({c.buttonPos.rotation}deg)"
            class="steps"
            src={footsteps}
            alt="footsteps"
        /></button
    >
{/each}
{#each secrets as s}
    {#if !s.found && ((s.uv_required && inventory.find(d => d.id == "uv_light")) || s.uv_required == undefined )}
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button
            class="secret"
            style:top={s.buttonPos.top}
            style:left={s.buttonPos.left}
            style:width={s.buttonPos.width || "40px"}
            style:height={s.buttonPos.height || "40px"}
            onclick={() => getItem(s)}
        ></button>
    {/if}
{/each}

<style>
    .secret {
        position: absolute;
        transform: translate(-50%, -50%);
        padding: 0;
        width: 40px;
        height: 40px;
        animation: pulse-glow 1.5s ease-in-out infinite;
        background-color: rgba(255, 255, 255, 0.05);
        border-radius: 50%;
    }

    @keyframes pulse-glow {
        0%,
        100% {
            filter: drop-shadow(0 0 0px rgba(255, 255, 255, 0));
        }
        50% {
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
        }
    }
    .connection {
        position: absolute;
        transform: translate(-50%, -50%);
    }
    .steps {
        width: 30px;
        opacity: 1;
        transform-origin: center;
    }
    button {
        background: none;
    }
</style>
