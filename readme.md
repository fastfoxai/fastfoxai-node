# FastFox Node.js SDK

Node.js library for the FastFox API.

## Install

```bash
npm install fastfox
# or
yarn add fastfox
```

## Setup

First, you need to get an API key, which is available in the [FastFox Dashboard](https://fastfox.ai).

```js
import { FastFox } from 'fastfox';
const fastfox = new FastFox('ff_your_api_key');
```

## Usage

Get your prompt's latest version:

```js
await fastfox.prompts.get('my-special-prompt');
```

## Get a specific version number of your prompt

Use the options object to specify the version of your prompt you'd like to use:

```js
await fastfox.prompts.get('my-special-prompt', {
  type: 'version',
  version: 3,
});
```

## Get a specific version of your prompt using an alias

Use an alias to retrieve a dynamic prompt version as defined in your Fast Fox account:

```js
await fastfox.prompts.get('my-special-prompt', {
  type: 'alias',
  alias: 'production',
});
```

## License

MIT License
