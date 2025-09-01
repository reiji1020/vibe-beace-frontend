<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    // load swagger-ui css
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/swagger-ui-dist/swagger-ui.css';
    document.head.appendChild(link);

    // load swagger bundle, then init
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js';
    script.onload = () => {
      // @ts-ignore
      const SwaggerUIBundle = (window as any).SwaggerUIBundle;
      SwaggerUIBundle({
        url: '/openapi.yaml',
        dom_id: '#swagger-ui',
        presets: [SwaggerUIBundle.presets.apis],
        layout: 'BaseLayout'
      });
    };
    document.body.appendChild(script);
  });
</script>

<section class="guide">
  <h1>API Docs (Swagger UI)</h1>
  <p>
    書込み系APIを試すには、右上の「Authorize」から <code>X-CSRF-Token</code> を入力してください。
    値はブラウザのクッキー <code>csrf</code> に設定されています。
  </p>
</section>
<div id="swagger-ui" style="min-height: 100vh"></div>

<style>
  .guide {
    padding: 16px;
  }
  .guide h1 {
    margin: 0 0 8px;
    font-size: 20px;
  }
  .guide code {
    background: #f5f5f5;
    padding: 0 4px;
    border-radius: 3px;
  }
</style>
