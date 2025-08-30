<script lang="ts">
  import { Button, Checkbox, FormGroup, Input, Select } from 'cclkit4svelte';
  import { CCLVividColor } from 'cclkit4svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  let { item } = data;

  const statusOptions = [
    { value: 'unused', label: '未使用' },
    { value: 'used', label: '使用中' }
  ];
</script>

<main>
  <h1>クロスステッチ布を編集</h1>

  <form method="POST">
    <FormGroup>
      <Input label="カウント" bind:value={item.count} required />
      <input type="hidden" name="count" value={item.count} />
    </FormGroup>
    <FormGroup>
      <Input label="色" bind:value={item.color} required />
      <input type="hidden" name="color" value={item.color} />
    </FormGroup>
    <FormGroup>
      <Input label="サイズ" bind:value={item.size} required />
      <input type="hidden" name="size" value={item.size} />
    </FormGroup>
    <FormGroup>
      <Input label="数量" type="number" bind:value={item.quantity} required />
      <input type="hidden" name="quantity" value={item.quantity} />
    </FormGroup>
    <FormGroup>
      <Select label="状態" options={statusOptions} bind:value={item.status} />
      <input type="hidden" name="status" value={item.status} />
    </FormGroup>
    <FormGroup>
      <Checkbox label="欲しいものリストに追加" bind:checked={item.wishlist} />
      <input type="hidden" name="wishlist" value={item.wishlist ? 'on' : 'off'} />
    </FormGroup>
    <Button type="submit" label="更新する" bgColor={CCLVividColor.PINEAPPLE_YELLOW} />
  </form>
</main>

<style>
  main { margin: 2rem; }
  h1 { text-align: center; margin-bottom: 2rem; }
  form { max-width: 600px; margin: 0 auto; }
</style>

