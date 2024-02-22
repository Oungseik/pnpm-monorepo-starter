<script lang="ts">
  import type { AppRouter } from "@repo/trpc";
  import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

  const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "http://localhost:8080/api/trpc",
      }),
    ],
  });

  const loginPromise = client.auth.login.query({ password: "12345678", email: "oung@gmail.com" });
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#await loginPromise}
  <p>loading ...</p>
{:then data}
  <p>Successfully login</p>
  <pre>
      {JSON.stringify(data)}
  </pre>
{:catch err}
  <p>login failed</p>
  <pre>
      {err}
  </pre>
{/await}
