<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let material: any; // thread, bead, or cutCloth object

    let title: string;
    let details: string;

    const dispatch = createEventDispatcher();

    // Helper function to translate status
    function getStatusLabel(status: string | null | undefined): string {
        switch (status) {
            case 'unused': return '未使用';
            case 'used': return '使用中';
            case 'low': return '残りわずか';
            default: return 'N/A';
        }
    }

    // Determine content based on material type
    $: {
        if (material.brand && material.colorNumber) { // Thread
            title = `${material.brand} ${material.colorNumber}`;
            details = `色名: ${material.colorName || 'N/A'}
数量: ${material.quantity}
状態: ${getStatusLabel(material.status)}
欲しいもの: ${material.wishlist ? 'はい' : 'いいえ'}`;
        } else if (material.itemCode && material.size) { // Bead
            title = `${material.brand} ${material.itemCode}`;
            details = `サイズ: ${material.size}
色名: ${material.colorName || 'N/A'}
数量: ${material.quantity}
状態: ${getStatusLabel(material.status)}
欲しいもの: ${material.wishlist ? 'はい' : 'いいえ'}`;
        } else if (material.fabricType && material.pattern) { // CutCloth
            title = `${material.fabricType} ${material.pattern}`;
            details = `サイズ: ${material.size}
数量: ${material.quantity}
状態: ${getStatusLabel(material.status)}
欲しいもの: ${material.wishlist ? 'はい' : 'いいえ'}`;
        }
    }

    function handleDelete() {
        dispatch('delete', { id: material.id, type: material.brand ? 'thread' : (material.itemCode ? 'bead' : 'cutCloth') });
    }
</script>

<div class="material-card">
    <button class="delete-button" on:click={handleDelete}>&times;</button>
    <div class="card-header">
        <img src="/beace.svg" alt="material icon" class="card-icon" />
        <h2>{title}</h2>
    </div>
    <div class="card-body">
        <p>{details}</p>
    </div>
</div>

<style>
    .material-card {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative; /* For positioning the delete button */
    }

    .delete-button {
        position: absolute;
        top: 5px;
        right: 5px;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #aaa;
        cursor: pointer;
        line-height: 1;
        padding: 0 5px;
    }

    .delete-button:hover {
        color: #f00;
    }

    .card-header {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
    }

    .card-icon {
        width: 40px;
        height: 40px;
        margin-right: 1rem;
    }

    .card-header h2 {
        margin: 0;
        font-size: 1.2rem;
        color: #333;
    }

    .card-body p {
        white-space: pre-wrap; /* Preserve newlines */
        font-size: 0.9rem;
        color: #555;
    }
</style>
