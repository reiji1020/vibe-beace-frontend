<script lang="ts">
    import { CommonHeader, RadioButton, Button, Alert } from "cclkit4svelte";
    import { CCLVividColor } from "cclkit4svelte";
    import MaterialCard from "$lib/components/MaterialCard.svelte";

    export let data;

    const materialTypes = [
        { id: 'threads', label: '刺繍糸' },
        { id: 'beads', label: 'ビーズ' },
        { id: 'cutCloths', label: 'カットクロス' },
    ];

    let selectedMaterial = 'threads';

    let showAlert = false;
    let alertMessage = '';
    let alertType: 'success' | 'error' | 'warning' | 'info' = 'info';

    async function handleDelete(id: number, type: string) {
        let apiEndpoint = '';

        switch (type) {
            case 'thread':
                apiEndpoint = '/api/deleteThread';
                break;
            case 'bead':
                apiEndpoint = '/api/deleteBead';
                break;
            case 'cutCloth':
                apiEndpoint = '/api/deleteCutCloth';
                break;
            default:
                console.error('Unknown material type for deletion:', type);
                return;
        }

        if (confirm('本当に削除しますか？')) {
            const response = await fetch(apiEndpoint, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                alertMessage = '資材を削除しました。';
                alertType = 'success';
                showAlert = true;
                setTimeout(() => showAlert = false, 3000); // 3秒後にアラートを非表示

                // 削除成功後、ページをリロードして最新のデータを取得
                location.reload();
            } else {
                const errorData = await response.json();
                alertMessage = `削除に失敗しました: ${errorData.error || response.statusText}`;
                alertType = 'error';
                showAlert = true;
                setTimeout(() => showAlert = false, 5000); // 5秒後にアラートを非表示
            }
        }
    }
</script>

<CommonHeader bgColor={CCLVividColor.PINEAPPLE_YELLOW} height="--hd-normal" logo="/beace.svg" logoHeight="50px" />

<main>
    {#if showAlert}
        <div class="alert-container">
            <!-- Note: Based on previous inspection of node_modules/cclkit4svelte/dist/index.js, 'Alert' does not appear to be exported.
                 If a SyntaxError occurs, it might be due to this component not being available in the library. -->
            <Alert message={alertMessage} type={alertType} dismissible={true} />
        </div>
    {/if}

    <div class="radio-group">
        {#each materialTypes as material}
            <RadioButton bind:group={selectedMaterial} value={material.id} label={material.label} />
        {/each}
    </div>

    <div class="add-button-container">
        {#if selectedMaterial === 'threads'}
            <a href="/inventory/add-thread">
                <Button label="刺繍糸を追加する" onClick={() => {}} bgColor={CCLVividColor.PINEAPPLE_YELLOW} />
            </a>
        {/if}
        {#if selectedMaterial === 'beads'}
            <a href="/inventory/add-bead">
                <Button label="ビーズを追加する" onClick={() => {}} bgColor={CCLVividColor.PINEAPPLE_YELLOW} />
            </a>
        {/if}
        {#if selectedMaterial === 'cutCloths'}
            <a href="/inventory/add-cut-cloth">
                <Button label="カットクロスを追加する" onClick={() => {}} bgColor={CCLVividColor.PINEAPPLE_YELLOW} />
            </a>
        {/if}
    </div>

    <div class="card-container">
        {#if selectedMaterial === 'threads'}
            {#if data.threads.length > 0}
                {#each data.threads as thread}
                    <MaterialCard material={thread} onDelete={handleDelete} />
                {/each}
            {:else}
                <div class="no-data">
                    <p>刺繍糸のデータがありません。</p>
                </div>
            {/if}
        {/if}
        {#if selectedMaterial === 'beads'}
            {#if data.beads.length > 0}
                {#each data.beads as bead}
                    <MaterialCard material={bead} onDelete={handleDelete} />
                {/each}
            {:else}
                <div class="no-data">
                    <p>ビーズのデータがありません。</p>
                </div>
            {/if}
        {/if}
        {#if selectedMaterial === 'cutCloths'}
            {#if data.cutCloths.length > 0}
                {#each data.cutCloths as cutCloth}
                    <MaterialCard material={cutCloth} onDelete={handleDelete} />
                {/each}
            {:else}
                <div class="no-data">
                    <p>カットクロスのデータがありません。</p>
                </div>
            {/if}
        {/if}
    </div>
</main>

<style>
    .alert-container {
        margin: 1rem 2rem;
    }
    .radio-group {
        display: flex;
        justify-content: center;
        gap: 2rem; /* Add some space between radio buttons */
        margin: 2rem;
    }
    .add-button-container {
        display: flex;
        justify-content: center;
        margin: 0 2rem 1rem;
    }
    .card-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem;
        margin: 2rem;
    }
    .no-data {
        text-align: center;
        margin-top: 4rem;
        grid-column: 1 / -1; /* 中央表示のためグリッド全体を使う */
    }
    .no-data p {
        margin-bottom: 1rem;
    }
</style>
