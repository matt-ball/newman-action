# Newman Action

Allows you to run Postman's headless collction runner, Newman, via a GitHub Action meaning no config of the Newman lib itself.

## Getting Started

This action supports multiple ways of retrieving your Postman collections/environments.

### Local files
If you've exported your collection and/or environment to your repo, provide the relative path to where the file sits in your repo (default: `postman_collection.json` / `postman_environment.json`).

```
- uses: actions/checkout@master
- uses: matt-ball/newman-action@master
  with:
    collection: postman_collection.json
    environment: postman_environment.json
```          

### Via URL
If you're collection and/or environment is sitting at a URL accessible to your GitHub action, you can include that directly.

```
- uses: actions/checkout@master
- uses: matt-ball/newman-action@master
  with:
    collection: https://example.com/postman/collection.json
    environment: https://example.com/postman/environment.json
```

### Via Postman API
The latest version of your collection and/or environment is available through [Postman's API](https://docs.api.getpostman.com/?version=latest). The API docs contain endpoints that will allow you to retrieve the required IDs. Passing these IDs along with your Postman API key will run Newman in this method. See [Creating and using secrets](https://help.github.com/en/articles/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables) for how to add your Postman API to GitHub securely.

```
- uses: actions/checkout@master
- uses: matt-ball/newman-action@master
  with:
    postmanApiKey: ${{ secrets.postmanApiKey }}
    collection: 5922408-c22ef764-b464-424c-8702-750343478723
    environment: 5922408-228c7edd-fc15-4f68-9665-a35d7df6945b
```

## Example workflow file

This yml file should be located in `.github/workflows`. You can mix and match any of the above methods.

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
      - uses: actions/checkout@master
      - uses: matt-ball/newman-action@master
        with:
          postmanApiKey: ${{ secrets.postmanApiKey }}
          collection: postman_collection.json
          environment: 5922408-228c7edd-fc15-4f68-9665-a35d7df6945b
```

See [Workflow syntax for GitHub Actions](https://help.github.com/en/articles/workflow-syntax-for-github-actions) for more.

## Other settings

As well as `postmanApiKey`, `collection`, and `environment`, all other Newman settings are supported. You can find a full list [on the Newman docs](https://github.com/postmanlabs/newman#api-reference).
