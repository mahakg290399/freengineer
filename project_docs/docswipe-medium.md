# I Built Tinder for My Downloads Folder

**DocSwipe: an offline-first Android app for deleting documents without regret.**

My phone had hundreds of PDFs, payslips, resumes, e-books, random DOCXs from 2021 that I was definitely going to read later. I never read them. The file manager showed me a giant list sorted by name, which is exactly as useful as it sounds.

So I built DocSwipe — swipe left to stage for deletion, swipe right to keep, scroll to actually read it. No cloud. No account. Nothing leaves the phone.

This is the build-in-public story: what I made, what was hard, and what a 363 MB APK taught me.

---

## The problem: file managers show you files. They don't help you decide.

Cleaning documents is a triage problem, not a browsing problem.

For every file you really only need to answer one question: **does this still need to be kept?**

File managers make you answer that 500 times in a row with zero context — no grouping, no progress, no undo, no safety net. So you give up at file #12 and live with the clutter forever.

I wanted a focused review deck:
- show me one document at a time
- let me read it in place
- let me decide in one gesture
- never punish a fast decision

That became DocSwipe.

## The idea: months, not folders. A deck, not a list.

DocSwipe scans local storage and groups supported documents by their **last-modified month**.

July 2026: 14 documents. August 2024: 43 documents. Etc.

You pick a month, you get a deck. Each card is:

- **← left: stage for deletion**
- **→ right: keep**
- **↑ / ↓: read and scroll**
- **skip: decide later**
- **undo: restore the last decision, no questions asked**

No files are moved or renamed. The month buckets and review states live only in DocSwipe's local database.

Skipped files come back for a second pass. A month stays "Pending review" until it's actually resolved. If a rescan finds a new file in a completed month, that month reopens automatically.

Simple rule I locked early: **nothing is ever deleted during swiping.** Swiping only stages. After the deck you get a review screen with every staged file, its path, size, and total reclaimable bytes. You can restore anything. Then you hit Delete Selected. That's the confirmation boundary.

Deletion is permanent — no Android Trash step — but it's always explicit, batched, and it survives partial failure. If 9 of 10 delete and 1 fails, you see exactly which one failed, why, its full path, and a retry button. Failures live in a `Failed Deleted Files` section on the home screen. They don't silently disappear.

## Offline-first wasn't a feature. It was the point.

DocSwipe never uploads documents, metadata, hashes, passwords, or telemetry. There is no server. There is no account.

That constraint shaped everything:

- **Supported formats:** PDF (including password-protected, passwords kept in memory only, cleared when the process ends), DOCX, XLSX, PPTX with offline HTML-based rendering, plus TXT and CSV with streaming text preview.
- **Smart exclusions:** zero-byte files, unknown formats, symlinks, `Android/`, `data/`, `obb/`, and system folders are out. Hidden-folder scanning is off by default — you opt in on first launch.
- **Stack:** Kotlin + Jetpack Compose, Room with migrations from day one, portrait-only, Android 14+.

Office rendering is honest offline rendering, not Word's engine. If a DOCX has 40 floating text boxes and custom fonts, it won't look pixel-perfect — and the app would rather show that limitation visibly than silently lie to you.

## The hard parts nobody sees

**1. Gestures.**
Horizontal swipe must triage. Vertical scroll must read. Diagonal gestures must pick one and stick with it for the whole touch. I use explicit directional locking after touch slop — once it locks to card-swipe or document-scroll, it never changes mid-gesture. Edge overscroll shows a subtle boundary animation, never an accidental delete. Buttons and swipes produce identical state transitions.

**2. Duplicates.**
Only byte-identical files count. Pipeline: group by exact size → sparse chunk fingerprints → full SHA-256 confirmation. Size alone is never enough.

The oldest byte-identical file is labeled `ORIGINAL`. Every duplicate still gets its own card, but it's shown in the original's month bucket so you can nuke the copies together. Delete the original? The oldest remaining duplicate automatically becomes the new original. Metadata only, files never move.

**3. Deletion safety.**
Attempt once per file, continue through the whole batch, report attempted / succeeded / failed / bytes reclaimed. Failed files keep their identity so you can retry explicitly. No general history screen — just actionable failures.

## Yes, the APK is 363 MB. Here's why.

The debug APK is huge because of the embedded native Office renderer, not my UI code:

- OpenDocument renderer arm64: ~79 MB, x86_64: ~76 MB, ARMv7: ~67 MB, x86: ~66 MB
- PDF native libs: ~15 MB
- Kotlin bytecode pre-shrinking: ~57 MB

The debug build ships all CPU architectures at once for phones + emulators, with no R8/resource shrinking.

The plan is straightforward: keep embedded functionality for now, add a proper release build with shrinking, publish an arm64-only APK for real phones (my Pixel 6a test device), keep the universal build for emulators, and revisit App Bundles + on-demand Office delivery when and if this goes to Google Play.

I'd rather ship something that actually renders Office files offline than something small that only extracts plain text.

## What I learned

1. Deletion UX is trust UX. Undo, skip-later, and a real review screen matter more than any animation.
2. Never declare duplicates without full-hash confirmation. Sparse hashes are a filter, not a verdict.
3. Keep file I/O off the main thread, treat every file op as fallible, and design for empty storage, denied permission, cancelled scan, corrupted file, and protected PDF from the start.
4. Small Clean Architecture beats ceremony. No extra modules, no DI framework until the code proves it needs one.

Full spec, tests, and CI (unit tests + debug APK on every push) are in the repo.

## Try it

This is a personal side-load build, not a Play Store release. Android 14+, portrait only.

- **Source:** https://github.com/mahakg290399/docswipe
- **Latest debug APK:** https://github.com/mahakg290399/docswipe/releases/download/latest/app-debug.apk

Install it, allow storage access, answer the hidden-folders prompt, and swipe through your oldest month first. That's the intended onboarding.

If it deletes three copies of the same offer letter from 2022, it already paid for itself.

---

*I'm Mahak — freengineer.me — the human layer between you & AI. I build weird useful things: cloud systems, data platforms, and now, an app that helps you throw things away. First 20M tokens are on me.*
