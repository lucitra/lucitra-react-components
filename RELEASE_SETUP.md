# Automated Release Setup

This repository uses automated releases with release-please and GitHub Actions, following the same setup as lucitra/linear-mcp.

## Required GitHub Secrets

You need to configure the following secret in your GitHub repository settings:

### NPM_TOKEN
1. Go to https://www.npmjs.com/
2. Sign in to your account  
3. Click on your profile picture → "Access Tokens"
4. Click "Generate New Token" → "Classic Token"
5. Name: "lucitra-react-components GitHub Actions"
6. Type: "Automation"
7. Copy the generated token
8. In GitHub: Settings → Secrets and variables → Actions → New repository secret
9. Name: `NPM_TOKEN`
10. Value: [paste your NPM token]

## How It Works

1. **Commit to main**: Use conventional commits (e.g., `feat:`, `fix:`, `docs:`)
2. **Release PR**: release-please creates/updates a PR with version bumps and changelog
3. **Merge PR**: When you merge the release PR, it triggers:
   - GitHub Release creation
   - NPM package publication with provenance

## Workflow File

- `.github/workflows/version-management.yml`: Single workflow that handles both release creation and NPM publishing

## Commit Message Format

This repository uses commitlint to enforce conventional commit messages via husky pre-commit hook.