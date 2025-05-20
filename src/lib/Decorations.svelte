<script>
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
        >{c.direction}</button
    >
{/each}

<style>
    .connection {
        position: absolute;
        transform: translate(-50%, -50%);
    }
</style>
