<script lang="ts">
	import { Button, Checkbox, CommonHeader, FormGroup, Input, Select } from 'cclkit4svelte';
	import { CCLVividColor } from 'cclkit4svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let { cutCloth } = data;

	const statusOptions = [
		{ value: 'unused', label: '未使用' },
		{ value: 'used', label: '使用中' }
	];
</script>

<CommonHeader
	bgColor={CCLVividColor.PINEAPPLE_YELLOW}
	height="--hd-normal"
	logo="/beace.svg"
	logoHeight="50px"
/>

<main>
	<h1>カットクロスを編集</h1>

	<form method="POST">
		<FormGroup>
			<Input label="種類" bind:value={cutCloth.fabricType} required />
			<input type="hidden" name="fabricType" value={cutCloth.fabricType} />
		</FormGroup>
		<FormGroup>
			<Input label="柄" bind:value={cutCloth.pattern} required />
			<input type="hidden" name="pattern" value={cutCloth.pattern} />
		</FormGroup>
		<FormGroup>
			<Input label="サイズ" bind:value={cutCloth.size} required />
			<input type="hidden" name="size" value={cutCloth.size} />
		</FormGroup>
		<FormGroup>
			<Input label="数量" type="number" bind:value={cutCloth.quantity} required />
			<input type="hidden" name="quantity" value={cutCloth.quantity} />
		</FormGroup>
		<FormGroup>
			<Select label="状態" options={statusOptions} bind:value={cutCloth.status} />
			<input type="hidden" name="status" value={cutCloth.status} />
		</FormGroup>
		<FormGroup>
			<Checkbox label="欲しいものリストに追加" bind:checked={cutCloth.wishlist} />
			<input type="hidden" name="wishlist" value={cutCloth.wishlist ? 'on' : 'off'} />
		</FormGroup>
		<Button
			type="submit"
			label="更新する"
			bgColor={CCLVividColor.PINEAPPLE_YELLOW}
			onClick={() => {}}
		/>
	</form>
</main>

<style>
	main {
		margin: 2rem;
	}
	h1 {
		text-align: center;
		margin-bottom: 2rem;
	}
	form {
		max-width: 600px;
		margin: 0 auto;
	}
</style>
