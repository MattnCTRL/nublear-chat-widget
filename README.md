# nublear-chat-widget

An embeddable AI chat widget powered by Claude. Drop a single `<script>` tag into any webpage and get a fully functional streaming chat interface with a floating button UI.

![Widget screenshot placeholder](https://via.placeholder.com/800x450/040d1a/00d4ff?text=Screenshot+coming+soon)

---

## Quick start

Add this to any page, just before `</body>`:

```html
<script
  src="https://cdn.example.com/nublear-widget.iife.js"
  data-endpoint="https://your-server.example.com"
  data-bot-name="Support Bot"
  data-welcome="Hi! How can I help you today?"
  data-accent="#00d4ff"
  data-secondary="#a78bfa"
></script>
```

That's it. No npm install, no build step on the consumer side.

---

## Configuration

All options are set via `data-*` attributes on the script tag.

| Attribute         | Default                          | Description                                      |
|-------------------|----------------------------------|--------------------------------------------------|
| `data-endpoint`   | `http://localhost:3001`          | URL of your chat server                          |
| `data-bot-name`   | `AI Assistant`                   | Name shown in the widget header                  |
| `data-welcome`    | `Hi! How can I help you today?`  | First message shown when the widget opens        |
| `data-accent`     | `#00d4ff`                        | Primary accent color (used for gradients, cursor)|
| `data-secondary`  | `#a78bfa`                        | Secondary gradient color                         |

---

## Server setup

The server is a small Express app in `server/`. It proxies requests to the Anthropic API and streams responses back using SSE.

```bash
cd server
cp .env.example .env
# Fill in ANTHROPIC_API_KEY
npm install
npm run dev
```

**Environment variables:**

| Variable            | Required | Description                                                  |
|---------------------|----------|--------------------------------------------------------------|
| `ANTHROPIC_API_KEY` | Yes      | Your Anthropic API key                                       |
| `ALLOWED_ORIGINS`   | No       | Comma-separated list of allowed CORS origins                 |
| `PORT`              | No       | Port to listen on (default: `3001`)                          |
| `SYSTEM_PROMPT`     | No       | System prompt sent to Claude with every conversation         |

---

## Widget development

```bash
npm install
npm run dev       # starts Vite dev server with the demo page
npm run build     # outputs dist/nublear-widget.iife.js
```

The build output is a single self-contained IIFE — no separate CSS file, no runtime dependencies to load. Host it anywhere and reference it with a `<script>` tag.

---

## Deploying the server

The server is stateless and deploys anywhere that runs Node.js.

**Railway / Fly.io**

Both work out of the box. Set `ANTHROPIC_API_KEY` and `ALLOWED_ORIGINS` as environment variables in the platform dashboard, then point your `data-endpoint` attribute at the deployed URL.

**Behind nginx**

If you're running behind nginx, add this to your location block to prevent response buffering from breaking SSE:

```nginx
location /chat {
    proxy_pass http://localhost:3001;
    proxy_buffering off;
    proxy_cache off;
    proxy_set_header X-Accel-Buffering no;
}
```

The server also sends `X-Accel-Buffering: no` in its response headers, which nginx respects automatically — but the explicit config above is more reliable.

---

## Tech stack

- **Widget** — React 18, TypeScript, CSS Modules, Vite (IIFE build)
- **Server** — Express, `@anthropic-ai/sdk`, SSE streaming
- **Model** — `claude-opus-4-5` (configurable in `server/src/lib/anthropic.ts`)

---

## License

MIT
