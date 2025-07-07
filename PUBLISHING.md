# Publishing to NPM

This guide walks you through publishing the @lucitra/react-components library to NPM.

## Automated Publishing (Recommended)

This repository uses [Release Please](https://github.com/googleapis/release-please) for automated version management and NPM publishing.

### How it works:

1. **Commit to main branch** using [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` for new features (minor version bump)
   - `fix:` for bug fixes (patch version bump)
   - `feat!:` or `BREAKING CHANGE:` for breaking changes (major version bump)

2. **Release Please** automatically:
   - Creates/updates a PR with version bumps and CHANGELOG updates
   - When PR is merged, creates a GitHub release
   - Publishes to NPM automatically

### Setup Requirements:

1. **NPM Token**: Add `NPM_TOKEN` to GitHub repository secrets
   - Get token from npmjs.com → Account Settings → Access Tokens
   - Create a "Automation" token with publish permissions
   - Add to GitHub: Settings → Secrets and variables → Actions → New repository secret

2. **Commit Format**: Use conventional commits:
   ```bash
   git commit -m "feat: add new Button component"
   git commit -m "fix: resolve RegionSwitcher dropdown issue"
   git commit -m "feat!: redesign LanguageSwitcher API"
   ```

## Manual Publishing

If you need to publish manually:

### Prerequisites

1. **NPM Account**: Create an account at [npmjs.com](https://www.npmjs.com/)
2. **Authentication**: Login to NPM from your terminal:
   ```bash
   npm login
   ```

## Pre-Publishing Checklist

- [ ] Update version in `package.json`
- [ ] Run tests: `npm test`
- [ ] Build the package: `npm run build`
- [ ] Test Storybook: `npm run storybook`
- [ ] Update README.md if needed
- [ ] Commit all changes

## Publishing Steps

### 1. Dry Run (Recommended)

First, do a dry run to see what will be published:

```bash
npm pack --dry-run
```

### 2. Version Update

Update the version using semantic versioning:

```bash
# For bug fixes
npm version patch

# For new features (backward compatible)
npm version minor

# For breaking changes
npm version major

# Or manually edit package.json
```

### 3. Build the Package

```bash
npm run build
```

### 4. Publish to NPM

```bash
# For first-time publishing
npm publish --access public

# For updates
npm publish
```

### 5. Verify Publication

Check your package at: https://www.npmjs.com/package/@lucitra/react-components

## Workflow Summary

### For Automated Releases:
1. Make changes and commit with conventional commits
2. Push to main branch
3. Release Please creates/updates a PR
4. Review and merge the PR
5. Package is automatically published to NPM

### For Manual Releases:
1. Update version manually
2. Build and test
3. Run `npm publish`

## Example Workflow

```bash
# Make changes
git add .
git commit -m "feat: add Card component with hover effects"
git push origin main

# Release Please will:
# 1. Create a PR titled "chore: release 1.1.0"
# 2. Update version in package.json
# 3. Update CHANGELOG.md
# 4. After merge → publish to NPM
```

## Post-Publishing

1. **Test Installation**: In a new project, run:
   ```bash
   npm install @lucitra/react-components
   ```

2. **Update Documentation**: Update any examples or documentation with the new version

3. **Create GitHub Release**: Tag your release in GitHub with release notes

## Troubleshooting

### Common Issues

1. **Authentication Error**: Run `npm login` again
2. **Package Name Taken**: Update name in package.json
3. **Build Errors**: Run `npm run build` and fix any errors
4. **Missing Files**: Check the `files` field in package.json

### Testing Locally

Before publishing, test your package locally:

```bash
# In your component library
npm pack

# In a test project
npm install ../lucitra-react-components/lucitra-react-components-1.0.0.tgz
```

## Unpublishing

To unpublish (within 72 hours):

```bash
npm unpublish @lucitra/react-components@<version>
```

**Note**: Unpublishing is discouraged. Consider deprecating instead:

```bash
npm deprecate @lucitra/react-components@<version> "<reason>"
```