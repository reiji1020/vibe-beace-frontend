<script lang="ts">
	import { Button, Checkbox, FormGroup, Input, Select } from 'cclkit4svelte';
	import { CCLVividColor } from 'cclkit4svelte';
	export let data: any;
  export let form: any;
  import { enhance } from '$app/forms';

  const topError = () => {
    const e = form?.error;
    if (!e) return '';
    if (typeof e === 'string') return e;
    const arr = e?.formErrors as string[] | undefined;
    return arr && arr.length ? arr.join(', ') : '';
  };
  const fe = (name: string) => form?.error?.fieldErrors?.[name]?.[0] as string | undefined;

	let fabricType: string = '';
	let pattern: string = '';
	let size: string = '';
	let quantity: number = 0;
	let status: string = '';
	let wishlist: boolean = false;

	const statusOptions = [
		{ value: 'unused', label: '未使用' },
		{ value: 'used', label: '使用中' }
	];
</script>

<main>
	<h1>カットクロスを追加</h1>

	<form method="POST" use:enhance>
		<input type="hidden" name="csrfToken" value={data.csrfToken} />

    {#if topError()}
      <div class="mt-2 mb-2 text-red-600">{topError()}</div>
    {/if}
		<FormGroup>
			<Input label="種類" bind:value={fabricType} required />
			<input type="hidden" name="fabricType" value={fabricType} />
      {#if fe('fabricType')}<div class="text-red-600 text-sm mt-1">{fe('fabricType')}</div>{/if}
		</FormGroup>
		<FormGroup>
			<Input label="柄" bind:value={pattern} required />
			<input type="hidden" name="pattern" value={pattern} />
      {#if fe('pattern')}<div class="text-red-600 text-sm mt-1">{fe('pattern')}</div>{/if}
		</FormGroup>
		<FormGroup>
			<Input label="サイズ" bind:value={size} required />
			<input type="hidden" name="size" value={size} />
      {#if fe('size')}<div class="text-red-600 text-sm mt-1">{fe('size')}</div>{/if}
		</FormGroup>
		<FormGroup>
			<Input label="数量" type="number" bind:value={quantity} required />
			<input type="hidden" name="quantity" value={quantity} />
      {#if fe('quantity')}<div class="text-red-600 text-sm mt-1">{fe('quantity')}</div>{/if}
		</FormGroup>
		<FormGroup>
			<Select label="状態" options={statusOptions} bind:value={status} />
			<input type="hidden" name="status" value={status} />
      {#if fe('status')}<div class="text-red-600 text-sm mt-1">{fe('status')}</div>{/if}
		</FormGroup>
		<FormGroup>
			<Checkbox label="欲しいものリストに追加" bind:checked={wishlist} />
			<input type="hidden" name="wishlist" value={wishlist ? 'on' : 'off'} />
      {#if fe('wishlist')}<div class="text-red-600 text-sm mt-1">{fe('wishlist')}</div>{/if}
		</FormGroup>
		<Button
			type="submit"
			label="追加する"
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
