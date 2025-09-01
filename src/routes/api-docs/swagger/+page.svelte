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

<div id="swagger-ui" style="min-height: 100vh"></div>

