The raw requirements for creating a plugin:
- *public* npm package that exposes / exports this interface:
https://github.com/wix-private/picasso/blob/master/packages/picasso-plugins/src/pluginModule.ts#L16
- it should be configured in the apropriate field under the app extension in dev-center

```
export interface PluginModule<TResult = unknown> {
  /**
   * Provision the plugin and copy all of the plugin's additional files.
   * @param env - All the parameters needed to provision the plugin.
   * @returns - A promise that resolves when the plugin is installed and all of the plugin's additional files were copied.
   */
  install?: (env: PluginEnv) => Promise<TResult>;
  /**
   * Generate the initial data for the plugin.
   * @param env - All the parameters needed to generate the data.
   * @returns - A promise that resolves when the data is ready.
   */
  generateData?: (env: PluginEnv) => Promise<void>;
  /**
   * Generate dynamic instructions based on the result of the plugin's install function and the static instructions of the plugin in dev center.
   *
   * If this function is not provided, the static instructions will be used.
   *
   * @param params - The result of the plugin's install function and the plugin's static instructions.
   * @returns - A promise that resolves with the updated instructions.
   */
  getInstructions?: (params: {
    result: TResult;
    originalInstructions: string | undefined;
  }) => Promise<string>;
}
```

In Detals:

- the `install()` fn runs in real-time as part of wix vibe flow on the wix vibe dev-machine, and should probably do the following:
a. install (provision) the app on the site
b. copy the relevant components / ui compoenents / pages etc.. over to the wix vibe project

# Files:

Although the underlying mechanism does not require it, we ask that the files that are copied over to the wix vibe project would come from a separate package that compresses them as a zip file and exposes it through the package (as done in this repo example) - see here this example package:
https://github.com/wix-private/vibe-plugins/tree/master/plugins/example-vertical/vibe-vertical-name-plugin-files

- `generateData(env)` fn should generate "mock data" on the site according to the user prompt

How `generateData` should basically work:
- use `env.providers` to generate json payloads relevant to the user prompt (which is supplied in `env.userRequest`). 
- Make api calls to create the relevant entities. Make api calls with your vertical SDK package or REST apis, you have the `WIX_TOKEN` variable in the `env` object
example:

For example:

https://github.com/wix-private/vibe-plugins/blob/master/plugins/stores/vibe-stores-plugin/src/index.ts#L23

https://github.com/wix-private/vibe-plugins/blob/master/plugins/stores/vibe-stores-plugin/src/utils.ts#L99

https://github.com/wix-private/vibe-plugins/blob/master/plugins/stores/vibe-stores-plugin/src/utils.ts#L150-L176

Use `generateImage` fn supplied to you under `env` to generate relevant images

- `getInstructions()` should return a string for the llm instructions for how to integrate the components to the wix vibe basic app template

for all the above, see implementaiton example in Wix Stores plugin in this repo.



