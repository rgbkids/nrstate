# nrstate

State for React Server Components (RSC) on Next.js

N: Next.js  
R: React Server Components  
State  


## Features

✨ Next.js 13 support, for RSC

- Read/Write state also works on Client-component.
- Read state also works on Server-component.


## Quick start

- nrstate  
https://www.npmjs.com/package/nrstate

```sh
npm i nrstate
```

- nrstate-client  
https://www.npmjs.com/package/nrstate-client

```sh
npm i nrstate-client
```

You can play with the example code here.

https://github.com/vteacher-online/nrstate-demo


### Server and Client Components Observation

Implement persistence, read or write by observing all state changes across your page, without impairing code-splitting.


#### PageState

A PageState represents a state of Page-component. 

- Client-component  
PageState can be `read` and `write` from any Client-component.

- Server-component  
PageState can be `read` from any Server-component.

ex.
![Demo](https://vteacher.online/wp-content/uploads/2023/04/nrstate_readme_img_ex.png "Demo")

- PageStateDemo.tsx

```tsx
export const pathDemo = '/demo';

export type PageStateDemo = {
  a: string;
  d: string;
};

export const initialPageStateDemo = { a: '', d: 'asc' } as PageStateDemo;
```


#### PageStateProvider

Components that use nrstate need `<PageStateProvider>` to appear somewhere in the parent tree. A good place to put this is in your root component.

Make the "page" Server-component.  
( Do not write "use client" )

- page.tsx

```tsx
export default function Page() {
  return (
    <PageStateProvider
      current={currentPageState<PageStateDemo>(
        initialPageStateDemo,
        pathDemo,
      )}
    >
      <></>
    </PageStateProvider>
  );
}
```


#### Read PageState

- Client component

```tsx
'use client';
```

```tsx
export default function ClientComponent() {
  const [pageState, setPageState] = usePageState<PageStateDemo>();
  const { a, d } = pageState;

  return (
    <>
      a={a}, d={d}
    </>
  );
}
```


- Server component

```tsx
export default async function ServerComponent() {
  const pageState = getPageState<PageStateDemo>(initialPageStateDemo, pathDemo);
  const { a, d } = pageState;

  return (
    <>
      a={a}, d={d}
    </>
  );
}
```


#### Write PageState

Client-component can use this.
PageState updates will result in a re-render of all components subscribed to that Page-component.

```tsx
'use client';
```

```tsx
export default function ClientComponentInput() {
  const [pageState, setPageState] = usePageState<PageStateDemo>();
  const { a } = pageState;
  return (
    <input type="text" onChange={(e) => {
      setPageState({
          ...pageState,
          a: e.target.value,
        }, pathDemo);
      }}
    />
  );
}
```

`useState` and `usePageState` can be used together.

You can play with the example code here.

https://github.com/vteacher-online/nrstate-demo

Then, http://localhost:3000/
