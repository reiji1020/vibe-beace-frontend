<script lang="ts">
	import '../app.css';
	import {CCLVividColor, CommonHeader, Footer} from 'cclkit4svelte';

	let { children } = $props();
</script>

<div class="page-container">
	<CommonHeader
			bgColor={CCLVividColor.PINEAPPLE_YELLOW}
			height="--hd-normal"
			logo="beace.svg"
			logoHeight="50px"
			href="/"
	/>
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
</style>
