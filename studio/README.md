# Sanity Blogging Content Studio

Congratulations, you have now installed the Sanity Content Studio, an open source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the community Slack](https://slack.sanity.io/?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)


## Start generation types

Before starting frontend code start by extracting the types and groq queries from the sanity-studio. run the following commands in sequence to create the intefaces.

```
sanity schema extract
sanity typegen generate
````

After this you should have a schema.json and a sanity.types.ts file. 