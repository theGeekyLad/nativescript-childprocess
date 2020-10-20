import { Application, Utils } from '@nativescript/core';

export class ChildProcess {

  private process: java.lang.Process;
  private errors: any;

  constructor(startCommand: string) {
    try {
      this.process = java.lang.Runtime.getRuntime().exec(startCommand)
    } catch (err) {
      this.errors = err
    }
  }

  getErrors(): any {
    return this.errors
  }

  clearErrors(): void {
    this.errors = null
  }

  getProcess(): java.lang.Process {
    return this.process
  }

  getOutput(): string {
    let br: java.io.BufferedReader = new java.io.BufferedReader(new java.io.InputStreamReader(this.process.getInputStream()))
    let output: string = '', line: string
    while ((line = br.readLine()) != null)
      output += line
    return output
  }

  static run(param0: Array<string>): Promise<any>;
  static run(param0: string, param1: native.Array<string>, param2: java.io.File): Promise<any>;
  static run(param0: string, param1: native.Array<string>): Promise<any>;
  static run(param0: native.Array<string>, param1: native.Array<string>, param2: java.io.File): Promise<any>;
  static run(param0: string): Promise<any>;
  static run(param0: native.Array<string>, param1: native.Array<string>): Promise<any>;
  static run(param0: any, param1?: any, param2?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        let proc: java.lang.Process

        if (param0 != null && param1 == null && param2 == null)
          proc = java.lang.Runtime.getRuntime().exec(param0)
        else if (param0 != null && param1 != null && param2 == null)
          proc = java.lang.Runtime.getRuntime().exec(param0, param1)
        else if (param0 != null && param1 != null && param2 != null)
          proc = java.lang.Runtime.getRuntime().exec(param0, param1, param2)

        proc.waitFor()

        let br: java.io.BufferedReader = new java.io.BufferedReader(new java.io.InputStreamReader(proc.getInputStream()))
        let output: string = '', line: string
        while ((line = br.readLine()) != null)
          output += line
        resolve(output)
      } catch (err) {
        reject(err)
      }
    })
  }

  runInteractive(command: string): ChildProcess {
    try {
      let bw: java.io.BufferedWriter = new java.io.BufferedWriter(new java.io.OutputStreamWriter(this.process.getOutputStream()))
      bw.write(command + '\r\n')
      bw.flush()
      bw.close()
    } catch (err) {
      this.errors = err
    }
    return this
  }

  closeSafely(exitCommand: string): Promise<ChildProcess> {
    return new Promise<ChildProcess>((resolve, reject) => {
      try {
        this.runInteractive(exitCommand)
        this.process.waitFor()
        resolve(this)
      } catch (err) {
        this.errors = err
        reject(this)
      }
    })
  }

  closeAbruptly(): Promise<ChildProcess> {
    return new Promise<ChildProcess>((resolve, reject) => {
      try {
        this.process.destroy()
        this.process.waitFor()
        resolve(this)
      } catch (err) {
        this.errors = err
        reject(this)
      }
    })
  }

  toString(): string {
    return JSON.stringify({
      output: this.getOutput(),
      errors: this.errors
    })
  }

}

