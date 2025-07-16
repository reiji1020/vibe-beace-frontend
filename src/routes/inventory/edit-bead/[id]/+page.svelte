<script lang="ts">
    import { Button, Checkbox, CommonHeader, FormGroup, Input, Select } from "cclkit4svelte";
    import { CCLVividColor } from "cclkit4svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
    let { bead } = data;

    const statusOptions = [
        { value: 'unused', label: '未使用' },
        { value: 'used', label: '使用中' },
        { value: 'low', label: '残りわずか' },
    ];
</script>

<CommonHeader bgColor={CCLVividColor.PINEAPPLE_YELLOW} height="--hd-normal" logo="/beace.svg" logoHeight="50px" />

<main>
    <h1>ビーズを編集</h1>

    <form method="POST">
        <FormGroup>
            <Input label="メーカー" bind:value={bead.brand} required />
            <input type="hidden" name="brand" value={bead.brand} />
        </FormGroup>
        <FormGroup>
            <Input label="品番" bind:value={bead.itemCode} required />
            <input type="hidden" name="itemCode" value={bead.itemCode} />
        </FormGroup>
        <FormGroup>
            <Input label="サイズ" bind:value={bead.size} required />
            <input type="hidden" name="size" value={bead.size} />
        </FormGroup>
        <FormGroup>
            <Input label="色名" bind:value={bead.colorName} />
            <input type="hidden" name="colorName" value={bead.colorName} />
        </FormGroup>
        <FormGroup>
            <Input label="数量" type="number" bind:value={bead.quantity} required />
            <input type="hidden" name="quantity" value={bead.quantity} />
        </FormGroup>
        <FormGroup>
            <Select label="状態" options={statusOptions} bind:value={bead.status} />
            <input type="hidden" name="status" value={bead.status} />
        </FormGroup>
        <FormGroup>
            <Checkbox label="欲しいものリストに追加" bind:checked={bead.wishlist} />
            <input type="hidden" name="wishlist" value={bead.wishlist ? 'on' : 'off'} />
        </FormGroup>
        <Button type="submit" label="更新する" bgColor={CCLVividColor.PINEAPPLE_YELLOW} onClick={() => {}} />
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