# Newman Action

Allows you to run Postman's headless collection runner, Newman, via a GitHub Action meaning no config of the Newman lib itself.

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
The latest version of your collection and/or environment is available through [Postman's API](https://docs.api.getpostman.com/?version=latest). The API docs contain endpoints that will allow you to retrieve the required UIDs. Note the distinction between UID and ID. The Postman API will return responses with `id` and `uid` fields. You'll want the `uid` value, not the `id` value.

Passing these UIDs along with your Postman API key will run Newman in this method. See [Creating and using secrets](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository) for how to add your Postman API to GitHub securely.

```
- uses: actions/checkout@master
- uses: matt-ball/newman-action@master
  with:
    apiKey: ${{ secrets.postmanApiKey }}
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
          apiKey: ${{ secrets.postmanApiKey }}
          collection: postman_collection.json
          environment: 5922408-228c7edd-fc15-4f68-9665-a35d7df6945b
```

See [Workflow syntax for GitHub Actions](https://help.github.com/en/articles/workflow-syntax-for-github-actions) for more.

## Other settings

As well as `apiKey`, `collection`, and `environment`, all other Newman settings are supported. You can find a full list [on the Newman docs](https://github.com/postmanlabs/newman#api-reference). This action uses the Node module under the hood, so ensure you are reading the API reference rather than the command line options. Alternatively, you can see the available options in `action.yml` in this repo.

Note that:
- GitHub Actions only supports `string`, `number` and `boolean` types. For fields that require objects/arrays, you will need to stringify them appropriately.
- `environment` and `globals` are only supported as a `string` in this Action. They cannot be passed stringified objects.
- `reporters` is only supported as a stringified object.

The following example demonstrates these notes in practice:

```
- uses: actions/checkout@master
- uses: matt-ball/newman-action@master
  with:
    collection: postman_collection.json
    environment: postman_environment.json
    reporters: '["emojitrain"]'
    delayRequest: 5000
    envVar: '[{ "key": "url", "value": "http://localhost:3000" }]'
```
