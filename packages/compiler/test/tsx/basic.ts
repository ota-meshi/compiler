import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { convertToTSX } from '@astrojs/compiler';

test('basic', async () => {
  const input = `
---
let value = 'world';
---

<h1 name="value" empty {shorthand} expression={true} literal=\`tags\`>Hello {value}</h1>
<div></div>
`;
  const output = `
let value = 'world';
<Fragment>
<h1 name="value" empty shorthand={shorthand} expression={true} literal={\`tags\`}>Hello {value}</h1>
<div></div>

</Fragment>

export default function __AstroComponent_(_props: Record<string, any>): any {}
`;
  const { code } = await convertToTSX(input);
  assert.snapshot(code, output, `expected code to match snapshot`);
});

test('named export', async () => {
  const input = `
---
let value = 'world';
---

<h1 name="value" empty {shorthand} expression={true} literal=\`tags\`>Hello {value}</h1>
<div></div>
`;
  const output = `
let value = 'world';
<Fragment>
<h1 name="value" empty shorthand={shorthand} expression={true} literal={\`tags\`}>Hello {value}</h1>
<div></div>

</Fragment>

export default function Test__AstroComponent_(_props: Record<string, any>): any {}
`;
  const { code } = await convertToTSX(input, { sourcefile: '/Users/nmoo/test.astro' });
  assert.snapshot(code, output, `expected code to match snapshot`);
});

test('moves @attributes to spread', async () => {
  const input = `<div @click={() => {}} name="value"></div>`;
  const output = `<Fragment>
<div name="value" {...{"@click":(() => {})}}></div>
</Fragment>

export default function __AstroComponent_(_props: Record<string, any>): any {}
`;
  const { code } = await convertToTSX(input);
  assert.snapshot(code, output, `expected code to match snapshot`);
});
