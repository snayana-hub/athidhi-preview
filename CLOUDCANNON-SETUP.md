# CloudCannon trial setup (staging only)

- CloudCannon Site: connect `snayana-hub/athidhi-preview` on the `Content-Edits` branch. Production remains GitHub Pages from `main`.
- Keep the CloudCannon Site hosted/build-enabled to support the Visual Editor's preview. Do not use Headless Mode, which disables builds and hosting.
- Trial page: `index.html` only. The homepage Visual Editor has explicit editable regions for the DE heading/introduction and story image source/alt. The title and description values are in the homepage front matter and have constrained Data Editor inputs; meta tags and social cards consume those same values. (`<head>` metadata is not a visible inline region.)
- Global editor config is data-only; `index.html` allows visual + data. CloudCannon's `_enabled_editors` cannot disable Source Editor; account permissions must do that. If the plan permits custom roles, deny SEO team `site:source-editor:write` and `site:file:write`. If not, keep the staging-only Content-Edits branch and Siri's merge as the ship gate. Do not invite editors until roles/permissions are checked.
- `_includes/tracking-codes.html` is a shared empty include wired into the homepage head. No tracking provider or ID is included; add one only after owner approval. Future pages can include the same partial if the owner wants site-wide tracking.
- All edits stay on `Content-Edits` and require Siri's GitHub merge before anything reaches live `main`. Do not publish from CloudCannon to production.
