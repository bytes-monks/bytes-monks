import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static.node';
import { StaticRouter } from 'react-router-dom';
import AppShell from './AppShell';
import { ROUTE_PATHS } from './routes';
import './index.css';

// Re-exported so scripts/prerender.mjs loads exactly one bundle.
export { ROUTES, HAND_FONT_HREF } from './lib/site';
export { headTags, headGraph } from './lib/head';
export { ROUTE_PATHS };

/**
 * Render one route to static markup.
 *
 * Uses React 19's static prerender rather than renderToString because the
 * routes are React.lazy for client code-splitting, and renderToString cannot
 * suspend — it would emit an empty page for every lazy route. prerenderToNodeStream
 * waits for the whole tree, lazy chunks included, before completing.
 *
 * The wrapper tree mirrors src/main.tsx exactly — StrictMode included — because
 * useId is position-sensitive and a mismatch would invalidate the prerender on
 * hydration.
 */
export async function render(url: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </StrictMode>,
    {
      onError(error: unknown) {
        throw error;
      },
    }
  );

  // The runtime value is a Node Readable; React's types describe the web
  // ReadableStream. Decoding via TextDecoder keeps this free of @types/node.
  const decoder = new TextDecoder();
  let html = '';
  for await (const chunk of prelude as unknown as AsyncIterable<string | Uint8Array>) {
    html += typeof chunk === 'string' ? chunk : decoder.decode(chunk, { stream: true });
  }
  return html + decoder.decode();
}
