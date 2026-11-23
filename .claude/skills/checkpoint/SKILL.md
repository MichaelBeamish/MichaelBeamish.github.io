---
name: checkpoint
description: Commit verified work on the task branch, push it, and open a pull request — all after one explicit owner approval. Then report CI and, only once the owner has merged, sync main. Use after /verify-task.
---

# Checkpoint (commit → push branch → pull request)

1. Confirm you are on the task branch (`task/<n>-…`). Never commit on `main` (it is protected anyway).
2. Run `git status` and `git diff --stat`. Make sure no secrets, build output, or unrelated files are included.
3. Propose, in one message:
   - The exact files to stage (and how to split them into commits, if more than one).
   - Conventional Commit message(s), e.g. `feat(simulation): add seeded world step`
     (types: feat, fix, docs, test, refactor, chore, ci). End each with the Co-Authored-By line.
   - The PR title (`<type>: <summary> (task #n)`) and a PR body following `.github/pull_request_template.md`,
     ending with the "Generated with Claude Code" line.
4. **Ask the owner for approval and wait.** One explicit "yes" covers commit + push of the branch + opening the PR.
5. On approval: stage only those files, commit, `git push -u origin <branch>`, then
   `gh pr create --base main --title … --body-file …`. Share the PR URL.
6. Watch CI on the PR (`gh pr checks <n> --watch`). Report the result; if it fails, fix on the branch and ask again before pushing.
7. **Merging is the owner's decision.** They click "Squash and merge" on GitHub, or explicitly ask you to
   (`gh pr merge <n> --squash`). Never merge on your own initiative.
8. After the owner confirms the merge (check `gh pr view <n> --json state` → `MERGED`):
   `git switch main && git pull --ff-only && git fetch --prune`, then `git branch -D <branch>`
   (`-D` is needed because squash merging rewrites the commits, so git can't see the branch as merged).
   Show `git log --oneline -3`.
9. Never amend pushed commits, force-push, or skip hooks unless the owner explicitly asks.
