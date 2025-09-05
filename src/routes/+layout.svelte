<script lang="ts">
  import '../app.css';
  import { CCLVividColor, CommonHeader, Footer, Button, Spinner, Alert } from 'cclkit4svelte';
  import type { LayoutData } from './$types';
  import { navigating } from '$app/stores';
  import { toast } from '$lib/ui/toast';
  import { onMount } from 'svelte';

  let { children, data } = $props();

  onMount(() => {
    if (data?.flash) {
      const { message, type } = data.flash;
      if (type === 'success') toast.success(message);
      else if (type === 'error') toast.error(message);
      else if (type === 'warning') toast.warning(message);
      else toast.info(message);
    }
  });
</script>

<div class="page-container">
  <CommonHeader
    bgColor={CCLVividColor.PINEAPPLE_YELLOW}
    height="--hd-normal"
    logo="/beace.svg"
    logoHeight="50px"
    href="/"
  />
  {#if data.user}
    <div class="logout-button-wrapper">
      <a href="/logout">
        <Button label="Logout" bgColor={CCLVividColor.WRAP_GREY} />
      </a>
    </div>
  {/if}
  <main>
    {@render children()}
  </main>
  <Footer bgColor={CCLVividColor.PINEAPPLE_YELLOW} />

  {#if $navigating && $navigating.to?.url?.pathname?.startsWith('/inventory')}
    <div class="loading-overlay" aria-live="polite" aria-busy="true">
      <Spinner size="64px" color={CCLVividColor.PINEAPPLE_YELLOW} />
    </div>
  {/if}

  {#if $toast.visible}
    <div class="global-toast">
      <Alert message={$toast.message} type={$toast.type} dismissible={true} />
    </div>
  {/if}
</div>

<style>
  .page-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
  }

  .logout-button-wrapper {
    position: absolute;
    top: 10px;
    right: 20px;
    z-index: 1000;
  }

  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.7);
    z-index: 2000;
  }

  .global-toast {
    position: fixed;
    right: 16px;
    bottom: 16px;
    width: min(320px, 80vw);
    z-index: 3000;
  }

  /* Mobile: hide logout button to reduce clutter */
  @media (max-width: 640px) {
    .logout-button-wrapper {
      display: none;
    }
  }
</style>
