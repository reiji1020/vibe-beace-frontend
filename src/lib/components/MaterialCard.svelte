<script lang="ts">
    export let material: any; // thread, bead, or cutCloth object
    export let onDelete: (id: number, type: string) => void;

    let title: string;
    let details: string;

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
            details = `色名: ${material.colorName || 'N/A'}\n数量: ${material.quantity}\n状態: ${getStatusLabel(material.status)}\n欲しいもの: ${material.wishlist ? 'はい' : 'いいえ'}`;
        } else if (material.itemCode && material.size) { // Bead
            title = `${material.brand} ${material.itemCode}`;
            details = `サイズ: ${material.size}\n色名: ${material.colorName || 'N/A'}\n数量: ${material.quantity}\n状態: ${getStatusLabel(material.status)}\n欲しいもの: ${material.wishlist ? 'はい' : 'いいえ'}`;
        } else if (material.fabricType && material.pattern) { // CutCloth
            title = `${material.fabricType} ${material.pattern}`;
            details = `サイズ: ${material.size}\n数量: ${material.quantity}\n状態: ${getStatusLabel(material.status)}\n欲しいもの: ${material.wishlist ? 'はい' : 'いいえ'}`;
        }
    }

    function handleDelete() {
        const type = material.brand ? 'thread' : (material.itemCode ? 'bead' : 'cutCloth');
        onDelete(material.id, type);
    }
</script>

<div class="material-card">
    <div class="card-actions">
        <a href={`/inventory/edit-${material.brand ? 'thread' : (material.itemCode ? 'bead' : 'cutCloth')}/${material.id}`} class="edit-button" title="編集">
            編集
        </a>
        <button class="delete-button" on:click={handleDelete} title="削除">&times;</button>
    </div>
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

    .card-actions {
        position: absolute;
        top: 5px;
        right: 5px;
        display: flex;
        gap: 4px;
    }

    .edit-button,
    .delete-button {
        background: none;
        border: none;
        font-size: 1.2rem; /* Adjusted for consistency */
        color: #aaa;
        cursor: pointer;
        line-height: 1;
        padding: 0 5px;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
    }

    .edit-button:hover {
        color: #70af0a; /* Melon Green */
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
