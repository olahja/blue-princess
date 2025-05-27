<script>
    import { fade, fly } from "svelte/transition";
    import { quadIn, quadOut, elasticOut } from "svelte/easing";
    let { baseSpeed } = $props();
</script>

<div class="content">
    <p
        in:fade|global={{
            duration: baseSpeed * 2,
            delay: baseSpeed * 10,
            easing: quadOut,
        }}
    >
        Kära Sofia!
    </p>
    <p
        in:fade|global={{
            duration: baseSpeed * 4,
            delay: baseSpeed * 12,
            easing: quadOut,
        }}
    >
        Grattis på din 30-årsdag!
    </p>
    <p
        in:fade|global={{
            duration: baseSpeed * 4,
            delay: baseSpeed * 15,
            easing: quadOut,
        }}
    >
        Tack för att jag får dela vardag, helg och
        högtid med dig.
    </p>
    <p
        in:fade|global={{
            duration: baseSpeed * 4,
            delay: baseSpeed * 18,
            easing: quadOut,
        }}
    >
        Det här rummet representerar min sista present till dig idag: en
        övernattning och middag på <a
            href="https://yasuragi.se/spapaket-overnattning/overnattning-namiyama"
            target="_blank">Yasurai</a
        >.
    </p>
    <p
        in:fade|global={{
            duration: baseSpeed * 4,
            delay: baseSpeed * 22,
            easing: quadOut,
        }}
    >
        Älskar dig!
    </p>
    <p
        in:fade|global={{
            duration: baseSpeed * 4,
            delay: baseSpeed * 22,
            easing: quadOut,
        }}
    >
        /Ola
    </p>
    <p
        class="the-end"
        
        in:fade|global={{
            duration: baseSpeed * 4,
            delay: baseSpeed * 25,
            easing: quadOut,
        }}
    >
        The End
    </p>
</div>

<style>
    .content {
        font-family: "Caveat", sans-serif;
        font-size: 28px;
        padding: 20px;
        position: relative;
    }
    .the-end {
        font-size: 40px;
        position:absolute;
        bottom: 0px;
        right: 25px;
    }
    a {
        color: white;
        text-decoration: underline;
    }
</style>
