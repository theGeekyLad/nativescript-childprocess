export declare class ChildProcess {

    /**
     * Creates an interactive shell session.
     * @param startCommand The interactive shell command _(`su` is an example of one)_.
     */
    constructor(startCommand: string);

    /**
     * Returns errors that have been collected from the onset of this process execution 
     * _(i.e. right from creation of the interactive shell session)_ up until now.
     */
    getErrors(): any;

    /**
     * Clears errors collected from the onset of this process execution up until now.
     * Helps if errors until this point in time are irrelevant.
     */
    clearErrors(): void;

    /**
     * Exposes the underlying Java process to not be confined by the bounds of the
     * `ChildProcess` plugin. Helps in cases where outputs of commands running in an
     * interactive shell have to collected and processed as and when available.
     * @returns The native Java process.
     */
    getProcess(): java.lang.Process;

    /**
     * @returns The output collected in course of execution of this process up until now.
     * _(For errors, check out `getErrors()`)_.
     */
    getOutput(): string;

    /**
     * Executes a single command on a local terminal / shell.
     * @returns A promise that resembles that of Node.js child process that resolves to an output or
     * rejects with an error.
     */
    static run(param0: Array<string>): Promise<any>;
    
    /**
     * Executes a single command on a local terminal / shell.
     * @returns A promise that resembles that of Node.js child process that resolves to an output or
     * rejects with an error.
     */
    static run(param0: string, param1: native.Array<string>, param2: java.io.File): Promise<any>;

    /**
     * Executes a single command on a local terminal / shell.
     * @returns A promise that resembles that of Node.js child process that resolves to an output or
     * rejects with an error.
     */
    static run(param0: string, param1: native.Array<string>): Promise<any>;

    /**
     * Executes a single command on a local terminal / shell.
     * @returns A promise that resembles that of Node.js child process that resolves to an output or
     * rejects with an error.
     */
    static run(param0: native.Array<string>, param1: native.Array<string>, param2: java.io.File): Promise<any>;

    /**
     * Executes a single command on a local terminal / shell _(`pm list packages` for instance)_.
     * @param param0 The command to be executed.
     * @returns A promise that resembles that of Node.js child process that resolves to an output or
     * rejects with an error.
     */
    static run(param0: string): Promise<any>;

    /**
     * Executes a single command on a local terminal / shell.
     * @returns A promise that resembles that of Node.js child process that resolves to an output or
     * rejects with an error.
     */
    static run(param0: native.Array<string>, param1: native.Array<string>): Promise<any>;

    /**
     * Runs commands inside of an interactive shell.
     * @param command This sub-command is run inside the interactive shell created while
     *                instantiating ChildProcess.
     * @returns This `ChildProcess` reference which allows for cascaded `runInteractive()` or 
     *          used to display the output or any errors.
     */
    runInteractive(command: string): ChildProcess;

    /**
     * Safely closes an interactive shell by running an exit command passed as a parameter.
     * @param exitCommand Typically `exit`.
     * @returns A promise that resolves to a `ChildProcess` and can be used to display the
     *          output or any errors.
     */
    closeSafely(exitCommand: string): Promise<ChildProcess>;

    /**
     * Abruptly closes an interactive shell _(which, for instance, is unresponsive such as a failing
     * network activity)_ by killing it.
     * @returns A promise that resolves to a `ChildProcess` and can be used to display the
     *          output or any errors.
     */
    closeAbruptly(): Promise<ChildProcess>;

    /**
     * @returns The output of the entire process and any errors.
     */
    toString(): string;
}
