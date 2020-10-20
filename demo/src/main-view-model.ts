import { Observable, TextView } from '@nativescript/core';
import { ChildProcess } from 'nativescript-childprocess'

export class HelloWorldModel extends Observable {
    private _command: string;

    onTap() {
        ChildProcess.run(this._command)
            .then(output => { this.notifyPropertyChange('message', output) })
            .catch(err => { this.notifyPropertyChange('message', err) })
    }

    onTextChange(argstf: any) {
        this._command = (<TextView>argstf.object).text
    }
}
