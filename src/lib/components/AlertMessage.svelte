<script lang="ts">
    export let message: string;
    export let type: 'success' | 'error' | 'warning' | 'info' = 'info';
    export let dismissible: boolean = false;

    let visible = true;

    function dismiss() {
        visible = false;
    }
</script>

{#if visible}
    <div class="alert alert-{type}">
        {message}
        {#if dismissible}
            <button class="dismiss-button" on:click={dismiss}>&times;</button>
        {/if}
    </div>
{/if}

<style>
    .alert {
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
    }

    .alert-success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }

    .alert-error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }

    .alert-warning {
        background-color: #fff3cd;
        color: #856404;
        border: 1px solid #ffeeba;
    }

    .alert-info {
        background-color: #d1ecf1;
        color: #0c5460;
        border: 1px solid #bee5eb;
    }

    .dismiss-button {
        background: none;
        border: none;
        font-size: 1.5rem;
        line-height: 1;
        cursor: pointer;
        color: inherit;
        opacity: 0.5;
    }

    .dismiss-button:hover {
        opacity: 1;
    }
</style>
