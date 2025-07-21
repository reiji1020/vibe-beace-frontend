<script lang="ts">
	import '../app.css';
	import { CCLVividColor, CommonHeader, Footer, Button } from 'cclkit4svelte';
	import type { LayoutData } from './$types';

	let { children, data } = $props();
</script>

<div class="page-container">
	<CommonHeader
			bgColor={CCLVividColor.PINEAPPLE_YELLOW}
			height="--hd-normal"
			logo="beace.svg"
			logoHeight="50px"
			href="/"
	/>
	{#if data.user}
		<div class="logout-button-wrapper">
			<a href="/logout">
				<Button label="Logout" bgColor={CCLVividColor.PINEAPPLE_YELLOW} />
			</a>
		</div>
	{/if}
	<main>
		{@render children()}
	</main>
	<Footer bgColor={CCLVividColor.PINEAPPLE_YELLOW} />
</div>

<style>
	.page-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
	}

	.logout-button-wrapper {
		position: absolute;
		top: 10px;
		right: 20px;
		z-index: 1000;
	}
</style>


