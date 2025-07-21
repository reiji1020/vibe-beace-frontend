<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";
  import { Button, CCLVividColor, Alert } from "cclkit4svelte";

  export let form: ActionData;
</script>

<div class="login-container">
  <div class="login-card">
    <h1 class="login-title">Login</h1>
    {#if form?.error}
      <Alert type="error" message={form.error} />
    {/if}
    <form method="POST" use:enhance class="login-form">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          class="login-input"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          class="login-input"
          required
        />
      </div>
      <div class="form-group">
        <Button type="submit" label="Login" bgColor={CCLVividColor.PINEAPPLE_YELLOW} />
      </div>
    </form>
  </div>
</div>

<style>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - var(--header-height, 0px));
    padding: 20px;
    background-color: var(--ccl-background-color, #f0f0f0);
  }

  .login-card {
    background-color: var(--ccl-surface-color, #ffffff);
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
  }

  .login-title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 30px;
    color: var(--ccl-text-color-primary, #333);
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    text-align: left;
  }

  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: var(--ccl-text-color-secondary, #555);
  }

  .login-input {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid var(--ccl-border-color, #ddd);
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box;
  }

  .login-input:focus {
    outline: none;
    border-color: var(--ccl-primary-color, #007bff);
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
</style>