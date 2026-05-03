# Contributing to TaalDNA

## Git Commit Standard

All commits follow this format:

```
vX.Y.Z type(scope): Imperative description
```

### Types
| Type | Use |
|---|---|
| feat | New functionality |
| fix | Bug fix |
| docs | Documentation only |
| style | Formatting, no logic |
| refactor | Code restructuring |
| test | Adding/updating tests |
| chore | Build, dependencies, tools |
| perf | Performance improvement |

### Rules (Chris Beams)
- Max 50 characters in subject
- Start with capital letter
- No period at the end
- Use imperative mood: "Add" not "Added"
- Always include version number first
- Write in English

### Examples
```
v1.3.9 feat(branding): Add page title and version badge
v1.4.0 feat(nav): Add back button to /start page
v1.4.1 feat(results): Add color score spectrum bar
```

### Never
- Push "WIP" to main
- Use past tense ("Added feature")
- Describe intentions ("Going to add...")
- Commit without version number

### Version bumping
- **Patch** (Z): every Cursor task
- **Minor** (Y): feature group complete
- **Major** (X): complete redesign
