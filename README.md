# Newman Action

Allows you to run Postman's headless collction runner, Newman, via a GitHub Action meaning no config of the Newman lib itself.

## Getting Started

Currently this action only works via retrieving your collection/environment through [Postman's API](https://docs.api.getpostman.com/?version=latest). The API docs contain endpoints that will allow you to retrieve these IDs. Therefore you'll need to pass:

- Your [Postman API key](https://docs.api.getpostman.com/?version=latest#authentication)
- The collection ID
- The environment ID

## Example workflow file

This yml file should be located in `.github/workflows`

```
name: Newman Run

on:
  pull_request:
    branches:
    - master

jobs:
  newman:
    runs-on: ubuntu-latest
    steps:
      - uses: matt-ball/newman-action@0.0.21
        with:
          postmanApiKey: ${{ secrets.postmanApiKey }}
          collection: 5922408-c22ef764-b464-424c-8702-750343478723
          environment: 5922408-228c7edd-fc15-4f68-9665-a35d7df6945b
```

See [Workflow syntax for GitHub Actions](https://help.github.com/en/articles/workflow-syntax-for-github-actions) for more.
