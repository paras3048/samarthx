<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Three.js / React Three Fiber scene files live under a `/build/` folder (e.g. `src/components/3d/build/`): the dev devtools plugin skips such paths, otherwise it injects `data-tsd-source` props onto R3F elements and crashes on hot reload.
- Keep supplied navigation content in the header content module; entries for unbuilt pages remain non-link text until their actual routes exist, preventing dead links and unintended placeholder pages.
- Shared marketing header, loading sequence and footer belong in the root layout so all pages use one consistent shell; illustrative previews are reusable client components and must identify sample data.
