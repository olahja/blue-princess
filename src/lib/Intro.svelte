<script>
    import title from "../assets/background/title.png";
    import { quadIn, quadOut, elasticOut } from "svelte/easing";
    import { fade, fly } from "svelte/transition";
    let { enterOpts } = $props();
</script>

<div
    class="title"
    in:fade|global={{
        duration: enterOpts.inDuration,
        delay: enterOpts.inDelay,
        easing: quadIn,
    }}
    out:fade|global={{
        duration: enterOpts.outDuration,
        easing: quadOut,
    }}
>
    <img src={title} alt="Description of my image" />
    <span>– a very short minigame</span>
</div>

<style>
    .title {
        width: 100%;
        position: absolute;
        top: 5%;
        text-align: center;
        font-style: italic;
        line-height: 1;
        img {
            width: 100%;
        }
    }
</style>
