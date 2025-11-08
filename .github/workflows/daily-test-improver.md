---
name: Daily Test Improver
on:
  workflow_dispatch:
  push:
    branches:
      - main    

timeout-minutes: 30

permissions:
  all: read
  id-token: write
  contents: write
  pull-requests: write

network: defaults

safe-outputs:
  create-pull-request:
    draft: true
  push-to-pull-request-branch:

tools:
  bash: [ ":*" ]
  github:
    toolsets: [all]

steps:
  - name: Checkout repository
    uses: actions/checkout@v5
    with:
      fetch-depth: 0

  - name: Configure git
    run: |
      git config user.name "github-actions[bot]"
      git config user.email "github-actions[bot]@users.noreply.github.com"
    shell: bash
  
  - name: Get current branch name
    id: branch_name
    run: |
      BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
      echo "name=$BRANCH_NAME" >> $GITHUB_OUTPUT
      echo "Current branch: $BRANCH_NAME"
    shell: bash

---
# Simple Pull Request Creator

## Job Description

You are an AI assistant for `${{ github.repository }}`. Your mission: Create a pull request by writing 1 word in a simple text file to create a diff.

**IMPORTANT**: The workflow is running from branch `${{ steps.branch_name.outputs.name }}`. Your new branch should be created from this branch, and the pull request should target this branch.

## Steps

1. **Determine current branch**
   - Run `git rev-parse --abbrev-ref HEAD` to get the current branch name
   - Store this as BASE_BRANCH - this is your base branch for creating the new branch
   - Log the base branch: `echo "Base branch: $BASE_BRANCH"`

2. **Create a new branch**
   - Create a new branch with format: `demo-pr-YYYY-MM-DD-HH-MM`
   - Use: `git checkout -b BRANCH_NAME`
   - Record the branch name for subsequent steps
   - Log the new branch: `git branch --show-current`

3. **Make changes**
   - Create or modify a simple text file: `demo-marker.txt`
   - Write a single word with timestamp to ensure uniqueness: `date -u +"%Y-%m-%d-%H-%M-%S" > demo-marker.txt`
   - Verify the file was created: `cat demo-marker.txt`
   - **Do NOT create test files or test code**

4. **Stage and commit changes**
   - Verify file exists: `ls -la demo-marker.txt`
   - Stage ALL changes: `git add -A`
   - Verify staging: `git status`
   - Show diff before commit: `git diff --cached`
   - Commit locally first: `git commit -m "Add demo marker file"`
   - Verify commit: `git log --oneline -1`
   - Show what changed: `git show HEAD --stat`

5. **Push changes to new branch**
   - Log before push: `echo "Pushing branch: $(git branch --show-current)"`
   - Use `push_to_pull_request_branch` tool with:
     - `branch`: your branch name from step 2
     - `message`: "Add demo marker file with timestamp"
   - Verify push: `git log origin/$(git branch --show-current) --oneline -1` 

6. **Verify differences before creating PR**
   - Get the base branch name: `git rev-parse --abbrev-ref HEAD@{1}` or use the BASE_BRANCH from step 1
   - Show commits not in base: `git log origin/$BASE_BRANCH..HEAD --oneline`
   - Show file diff: `git diff origin/$BASE_BRANCH...HEAD`
   - Log summary: `echo "Creating PR from $(git branch --show-current) to $BASE_BRANCH"`

7. **Create pull request**
   - Use `create_pull_request` tool with:
     - Title: "Demo PR - [YYYY-MM-DD]"
     - Description should include:
       - Summary: "Simple demo pull request with timestamped marker file"
       - Base branch: (the branch from step 1)
       - Head branch: (your new branch from step 2)
       - Files modified: `demo-marker.txt`
       - Content: Shows current timestamp
       - Commit SHA: (from step 4)

8. **Verify pull request**
   - Check that the PR was created successfully
   - Log the PR URL if available
   - Ensure only `demo-marker.txt` is included
   - No unwanted files (coverage reports, build artifacts, test files) are included