<script>
    import { Carousel, Button, Footer, CommonHeader } from "cclkit4svelte";
    import { CCLVividColor } from "cclkit4svelte";
    import ShoppingIcon from 'svelte-material-icons/shopping.svelte';

    const carouselItem = [
        {src: 'frame1.png', alt: 'frame1'},
        {src: 'frame2.png', alt: 'frame2'},
        {src: 'frame3.png', alt: 'frame3'},
    ]
</script>

<CommonHeader bgColor={CCLVividColor.PINEAPPLE_YELLOW} height="--hd-normal"  logo="beace.svg" logoHeight="50px" />
<section class="splash">
    <img class="splashImage" src="Splash.png" alt="main visual" />
</section>
<section class="description">
    <div class="informationWrapper">
        <ShoppingIcon class="informationImg" size="48" color="#ed9126" />
        <div class="informationTextWrapper">
            <p class="informationText">Beaceは、ついつい同じビーズをたくさん買ってしまうあなたのための整理ボックスツールです。</p>
        </div>
    </div>
    <div class="carouselWrapper">
        <Carousel src={carouselItem} csWidth="980px" />
    </div>
</section>
<section class="enter">
    <div class="enterWrapper">
        <a href="/inventory">
            <Button bgColor={CCLVividColor.PINEAPPLE_YELLOW} label="早速使ってみる！" />
        </a>
    </div>
</section>
<Footer bgColor={CCLVividColor.PINEAPPLE_YELLOW} />

<style>
    .splash {
        margin-bottom: 90px;
    }

    .splashImage {
        width: 100%;
    }

    .informationWrapper {
        display: flex;
        margin-bottom: 20px;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
        word-break: auto-phrase;
    }

    .informationText {
        font-size: 2.5rem;
        color: var(--wrap-grey);
        width: 600px;
        word-break: auto-phrase;
        overflow-wrap: break-word;
    }

    .carouselWrapper {
        display: flex;
        justify-content: center;
    }

    .enterWrapper {
        display: flex;
        justify-content: center;
        margin: 130px 0;
    }
</style>