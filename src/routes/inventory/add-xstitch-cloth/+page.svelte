<script lang="ts">
  import { Button, FormGroup, Input, Select, Checkbox } from 'cclkit4svelte';
  import { CCLVividColor } from 'cclkit4svelte';

  const statusOptions = [
    { value: 'unused', label: '未使用' },
    { value: 'used', label: '使用中' }
  ];

  let count = '';
  let color = '';
  let size = '';
  let quantity: number = 0;
  let status: string = 'unused';
  let wishlist: boolean = false;
</script>

<main>
  <h1>クロスステッチ布を追加</h1>
  <form method="POST">
    <FormGroup>
      <Input label="カウント" placeholder="例: 14" bind:value={count} required />
      <input type="hidden" name="count" value={count} />
    </FormGroup>
    <FormGroup>
      <Input label="色" bind:value={color} required />
      <input type="hidden" name="color" value={color} />
    </FormGroup>
    <FormGroup>
      <Input label="サイズ" placeholder="例: 50x70cm" bind:value={size} required />
      <input type="hidden" name="size" value={size} />
    </FormGroup>
    <FormGroup>
      <Input label="数量" type="number" bind:value={quantity} required />
      <input type="hidden" name="quantity" value={quantity} />
    </FormGroup>
    <FormGroup>
      <Select label="状態" options={statusOptions} bind:value={status} />
      <input type="hidden" name="status" value={status} />
    </FormGroup>
    <FormGroup>
      <Checkbox label="欲しいものリストに追加" bind:checked={wishlist} />
      <input type="hidden" name="wishlist" value={wishlist ? 'on' : 'off'} />
    </FormGroup>
    <Button type="submit" label="追加する" bgColor={CCLVividColor.PINEAPPLE_YELLOW} />
  </form>
</main>

<style>
  main { margin: 2rem; }
  h1 { text-align: center; margin-bottom: 2rem; }
  form { max-width: 600px; margin: 0 auto; }
  :global(input[type="number"]) { appearance: textfield; }
</style>

