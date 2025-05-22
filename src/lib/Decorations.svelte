<script>
    import footsteps from "../assets/misc/footsteps.svg";
    let {
        selectedRoom,
        roomData,
        updateRoomData,
        updateDraftSettings,
        updateSelectedRoom,
    } = $props();

    let connections = $derived(roomData[selectedRoom].connections);
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
        ><img style:transform="rotate({c.buttonPos.rotation}deg)" class="steps" src={footsteps} alt="footsteps" /></button
    >
{/each}

<style>
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
