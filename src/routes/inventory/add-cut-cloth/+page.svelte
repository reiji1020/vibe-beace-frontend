<script lang="ts">
    import { Button, Checkbox, CommonHeader, FormGroup, Input, Select } from "cclkit4svelte";
    import { CCLVividColor } from "cclkit4svelte";

    let fabricType: string = '';
    let pattern: string = '';
    let size: string = '';
    let quantity: number = 0;
    let status: string = '';
    let wishlist: boolean = false;

    const statusOptions = [
        { value: 'unused', label: '未使用' },
        { value: 'used', label: '使用中' },
    ];
</script>

<CommonHeader bgColor={CCLVividColor.PINEAPPLE_YELLOW} height="--hd-normal" logo="/beace.svg" logoHeight="50px" />

<main>
    <h1>カットクロスを追加</h1>

    <form method="POST">
        <FormGroup>
            <Input label="種類" bind:value={fabricType} required />
            <input type="hidden" name="fabricType" value={fabricType} />
        </FormGroup>
        <FormGroup>
            <Input label="柄" bind:value={pattern} required />
            <input type="hidden" name="pattern" value={pattern} />
        </FormGroup>
        <FormGroup>
            <Input label="サイズ" bind:value={size} required />
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
        <Button type="submit" label="追加する" bgColor={CCLVividColor.PINEAPPLE_YELLOW} onClick={() => {}} />
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
