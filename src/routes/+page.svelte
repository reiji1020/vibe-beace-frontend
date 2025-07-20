<script>
	import { Carousel, Button, CommonHeader } from 'cclkit4svelte';
	import { CCLVividColor } from 'cclkit4svelte';

	const carouselItem = [
		{ src: 'frame1.png', alt: 'frame1' },
		{ src: 'frame2.png', alt: 'frame2' },
		{ src: 'frame3.png', alt: 'frame3' }
	];
</script>

<section class="splash">
	<img class="splashImage" src="Splash.png" alt="main visual" />
</section>
<section class="description">
	<div class="informationWrapper">
		<div class="informationTextWrapper">
			<div class="informationIconWrapper">
				<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
					<g clip-path="url(#clip0_94_34)">
						<path
							d="M48 16H42.6667C42.6667 10.1066 37.8934 5.33331 32 5.33331C26.1067 5.33331 21.3334 10.1066 21.3334 16H16C13.0667 16 10.6667 18.4 10.6667 21.3333V53.3333C10.6667 56.2666 13.0667 58.6666 16 58.6666H48C50.9334 58.6666 53.3334 56.2666 53.3334 53.3333V21.3333C53.3334 18.4 50.9334 16 48 16ZM26.6667 26.6666C26.6667 28.1333 25.4667 29.3333 24 29.3333C22.5334 29.3333 21.3334 28.1333 21.3334 26.6666V21.3333H26.6667V26.6666ZM32 10.6666C34.9334 10.6666 37.3334 13.0666 37.3334 16H26.6667C26.6667 13.0666 29.0667 10.6666 32 10.6666ZM42.6667 26.6666C42.6667 28.1333 41.4667 29.3333 40 29.3333C38.5334 29.3333 37.3334 28.1333 37.3334 26.6666V21.3333H42.6667V26.6666Z"
							fill="#ED9126"
						/>
					</g>
					<defs>
						<clipPath id="clip0_94_34">
							<rect width="64" height="64" fill="white" />
						</clipPath>
					</defs>
				</svg>
			</div>
			<p class="informationText">
				Beaceは、ついつい同じビーズをたくさん買ってしまうあなたのための整理ボックスツールです。
			</p>
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

	.informationIconWrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 20px;
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
