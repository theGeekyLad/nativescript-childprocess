# Child Process _(NativeScript Plugin)_

A NativeScript plugin for creation and execution of Android `java.lang.Process`es in Node.js child process style! As a webapp developer, you needn't worry about familiarizing yourself with the Java `Process` API, thanks to this plugin.

## Installation

- For NativeScript 7+:

```Bash
ns plugin add nativescript-childprocess
```

- For NativeScript versions < 7:

```Bash
tns plugin add nativescript-childprocess@1.0.0
```

## Usage

- The simplest implementation looks like so:

```TypeScript
import { ChildProcess } from 'nativescript-childprocess'
...
onClickRun() {
  ChildProcess.run('pm list packages')
    .then(output => { console.log('Success:', output) })
    .catch(error => { console.log('Failure:', error) })
}
```

- A slightly advanced implementation with an interactive shell would look like so:

```TypeScript
import { ChildProcess } from 'nativescript-childprocess'
...
async onClickRun() {
  let childProcess: ChildProcess = new ChildProcess('su')
  childProcess.runInteractive('ls /system/')
  childProcess.runInteractive('ls /system/bin/')
  await childProcess.closeSafely('exit')
  console.log(childProcess.getOutput())  // output of both `ls` commands
}
```

## API

### `constructor(startCommand: string)`

Creates an interactive shell session.

 * **Parameters:** `startCommand` — interactive shell command _(`su` is an example of one)_.

### `getErrors(): any`

Returns errors that have been collected from the onset of this process execution _(i.e. right from creation of the interactive shell session)_ up until now.

### `clearErrors(): void`

Clears errors collected from the onset of this process execution up until now. Helps if errors until this point in time are irrelevant.

### `getProcess(): java.lang.Process`

Exposes the underlying Java process to not be confined by the bounds of the `ChildProcess` plugin. Helps in cases where outputs of commands running in an interactive shell have to collected and processed as and when available.

 * **Returns:** — native Java process.

### `getOutput(): string`

 * **Returns:** — output collected in course of execution of this process up until now.

     _(For errors, check out `getErrors()`)_.

### `static run(param0: string): Promise<any>` + 4 overloads

Executes a single command on a local terminal / shell _(`pm list packages` for instance)_.

 * **Parameters:** `param0` — command to be executed.
 * **Returns:** — promise that resembles that of Node.js child process that resolves to an output or

     rejects with an error.

### `runInteractive(command: string): ChildProcess`

Runs commands inside of an interactive shell.

 * **Parameters:** `command` — sub-command is run inside the interactive shell created while

     instantiating ChildProcess.
 * **Returns:** — `ChildProcess` reference which allows for cascaded `runInteractive()` or 

     used to display the output or any errors.

### `closeSafely(exitCommand: string): Promise<ChildProcess>`

Safely closes an interactive shell by running an exit command passed as a parameter.

 * **Parameters:** `exitCommand` — `exit`.
 * **Returns:** — promise that resolves to a `ChildProcess` and can be used to display the

     output or any errors.

### `closeAbruptly(): Promise<ChildProcess>`

Abruptly closes an interactive shell _(which, for instance, is unresponsive such as a failing network activity)_ by killing it.

 * **Returns:** — promise that resolves to a `ChildProcess` and can be used to display the

     output or any errors.

### `toString(): string`

 * **Returns:** — output of the entire process and any errors.

Made with :heart: by `theGeekyLad`