<script lang="ts">
    import { Button, Checkbox, CommonHeader, FormGroup, Input, Select } from "cclkit4svelte";
    import { CCLVividColor } from "cclkit4svelte";

    let brand: string = '';
    let colorNumber: string = '';
    let colorName: string = '';
    let quantity: number = 0;
    let status: string = '';
    let wishlist: boolean = false;

    const statusOptions = [
        { value: 'unused', label: '未使用' },
        { value: 'used', label: '使用中' },
        { value: 'low', label: '残りわずか' },
    ];
</script>

<CommonHeader bgColor={CCLVividColor.PINEAPPLE_YELLOW} height="--hd-normal" logo="/beace.svg" logoHeight="50px" />

<main>
    <h1>刺繍糸を追加</h1>

    <form method="POST">
        <FormGroup>
            <Input label="メーカー" bind:value={brand} required />
            <input type="hidden" name="brand" value={brand} />
        </FormGroup>
        <FormGroup>
            <Input label="色番号" bind:value={colorNumber} required />
            <input type="hidden" name="colorNumber" value={colorNumber} />
        </FormGroup>
        <FormGroup>
            <Input label="色名" bind:value={colorName} />
            <input type="hidden" name="colorName" value={colorName} />
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
