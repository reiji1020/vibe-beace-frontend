<script lang="ts">
    import { Button, Checkbox, CommonHeader, FormGroup, Input, Select } from "cclkit4svelte";
    import { CCLVividColor } from "cclkit4svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
    let { thread } = data;

    const statusOptions = [
        { value: 'unused', label: '未使用' },
        { value: 'used', label: '使用中' },
        { value: 'low', label: '残りわずか' },
    ];
</script>

<CommonHeader bgColor={CCLVividColor.PINEAPPLE_YELLOW} height="--hd-normal" logo="/beace.svg" logoHeight="50px" />

<main>
    <h1>刺繍糸を編集</h1>

    <form method="POST">
        <FormGroup>
            <Input label="メーカー" bind:value={thread.brand} required />
            <input type="hidden" name="brand" value={thread.brand} />
        </FormGroup>
        <FormGroup>
            <Input label="色番号" bind:value={thread.colorNumber} required />
            <input type="hidden" name="colorNumber" value={thread.colorNumber} />
        </FormGroup>
        <FormGroup>
            <Input label="色名" bind:value={thread.colorName} />
            <input type="hidden" name="colorName" value={thread.colorName} />
        </FormGroup>
        <FormGroup>
            <Input label="数量" type="number" bind:value={thread.quantity} required />
            <input type="hidden" name="quantity" value={thread.quantity} />
        </FormGroup>
        <FormGroup>
            <Select label="状態" options={statusOptions} bind:value={thread.status} />
            <input type="hidden" name="status" value={thread.status} />
        </FormGroup>
        <FormGroup>
            <Checkbox label="欲しいものリストに追加" bind:checked={thread.wishlist} />
            <input type="hidden" name="wishlist" value={thread.wishlist ? 'on' : 'off'} />
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