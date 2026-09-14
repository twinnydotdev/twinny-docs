---
title: Workspace index
description: Embed the workspace so chat can find the code a question is about.
---

The workspace index lets chat pull in code you did not attach by hand. twinny splits your files into chunks, embeds them with your **embeddings** provider, and stores the vectors and a keyword index in a database under `~/.twinny/embeddings/`. A question that mentions `@workspace` is matched against the index and the best chunks are added to the prompt.

Open it from the database icon at the top of the sidebar, or run **Embedding options**.

## Setting up

1. Add an **Embeddings** provider in the Providers tab. Locally, `nomic-embed-text` on Ollama is a good default; see [Supported models](/twinny-docs/providers/supported-models/#embeddings).
2. In the Embeddings tab press **Index workspace**. Progress shows as files are embedded; you can cancel and resume later.

Once indexed, the tab shows how many files and chunks are in the index and which model embedded them.

## Keeping it current

- **Update** embeds only files that changed since the last run, by comparing a manifest of file hashes.
- **Rebuild** starts over. Needed after changing the embedding model or the chunk sizes, since vectors from different models and chunks of different sizes do not mix. The tab warns you when the index was built with a different model than the active provider.
- With `twinny.embeddingUpdateOnSave` (on by default), a file is re-embedded when you save it and forgotten when you delete it, once the workspace has been indexed.

## What gets indexed

Only source, config and documentation files, chosen by extension or well-known name (`Makefile`, `Dockerfile`, `README`, `.gitignore` and so on). Around 150 extensions are recognised, covering web, systems, JVM and .NET, scripting and functional languages, data and config formats, and documentation.

Skipped without being read: binaries, images (including SVG), fonts, archives, lockfiles (`package-lock.json`, `yarn.lock`, `Cargo.lock`...), minified files, source maps, snapshot files, and anything matched by the workspace's `.gitignore`. Files whose contents look binary are skipped after a peek.

Add your own exclusions with `twinny.embeddingIgnoredGlobs`, e.g. `["**/fixtures/**", "**/*.md", "vendor/**"]`.

## Chunking

Files are parsed with tree-sitter where a grammar exists and split along syntax boundaries, so a chunk is a function, a class, a block, or a run of top-level statements rather than an arbitrary slice. Chunks are exact slices of the source, which is why a hit can be opened at its lines. Files without a grammar (prose, unusual formats) are split at blank lines and markdown headings.

Very long chunks are embedded in windows for models with small input limits (such as `all-minilm`'s 256 tokens) and the windows are merged back to one chunk for search.

## Using it in chat

Type `@workspace` in a message to search the index for that question. The **Use the index for every message** switch in the Embeddings tab makes every message search it instead, which suits large codebases and capable models; small local models can get distracted by extra context, so it is off by default.

Follow-up questions reuse the previous question and the files its answer came from, so "and where is that called?" stays on topic. Under each answer a **context** line shows what was retrieved, its score, and a preview, with a link to open the chunk in the editor. When nothing scores above the threshold it says so, with a hint on what to change.

*Explain* (right-click) also looks up related code when an index exists.

## How retrieval works

```
 question ──► embed ──► vector search ─┐
         └─► keywords ──► BM25 search ─┴─► merge ──► rerank ──► expand ──► prompt
```

1. **Embed the question** with the same model as the index.
2. **Two searches.** A vector search over the embeddings and a BM25 keyword search over the chunk text. Identifiers are split for the keyword search, so `getUserName` matches `user name`, and camelCase or snake_case in the question finds the same code.
3. **Merge** the candidates from both.
4. **Rerank** with a small cross-encoder that reads the question together with each candidate and scores how likely it is to answer it. The reranker is bundled with the extension and runs locally in worker threads (ONNX); no provider is involved and nothing leaves the machine.
5. **Threshold and cap.** Chunks scoring below the rerank threshold are dropped; the best few are kept.
6. **Expand.** Each hit grows to its enclosing function or class when that fits the budget, and the file's imports are added once so the names in the hit resolve.

The result is placed in the prompt as labelled blocks with file and line range, after a short instruction to refer to those labels and ignore blocks that do not bear on the question.

## Tuning

| Setting (Embeddings tab) | Default | Effect |
| --- | --- | --- |
| Max chunk size | 1000 chars | Chunks are split to at most this size. Smaller matches more precisely; larger carries more context |
| Min chunk size | 100 chars | Chunks smaller than this are merged with a neighbour |
| Overlap | 100 chars | Text shared between adjacent chunks so a match on a boundary is not lost |
| Rerank threshold | 0.08 | Chunks scoring below this are left out. Lower it if answers miss code you know is there; raise it if they quote unrelated code |
| Relevant code snippets | 6 | The most chunks one question may add to the prompt |

Changing the chunk sizes needs a **Rebuild**. The threshold and snippet count take effect on the next question.

## Size and speed

The index lives on disk, one folder per workspace under `~/.twinny/embeddings/`. Indexing speed is set by the embedding server; a small model on a GPU handles a few hundred files a minute. Search is fast: the vector and keyword lookups take milliseconds, and the reranker scores a few dozen candidates in well under a second on a laptop CPU.

## Privacy

Chunks are sent to your embeddings provider to be embedded, so with a hosted embeddings provider (OpenAI) your code goes to that vendor. With a local model nothing leaves the machine. The database is a plain LanceDB directory you can delete at any time.
