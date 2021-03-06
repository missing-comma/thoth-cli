import { Argv } from 'yargs';
import { Yargs } from '~cli/protocols/yargs';
import { Flag, Positional } from '~cli/types';
import { Option } from '../option';
import * as helper from './helper';

export class YargsAdapter<T = {}> implements Yargs {
	private y: Argv<T>;

	constructor(public readonly depth: number, public readonly cmd: string[], y: Argv<T>) {
		this.y = y;
	}

	public option = (data: Flag.Default) => {
		data.alias = data.alias || [helper.aliasFromKeyGenerator(data.key)];
		const opt = new Option(data);
		this.y = this.y.option(opt.data.key, opt.mapFlag());
		return this;
	};

	public positional = (data: Positional.Default) => {
		const opt = new Option(data);
		this.y = this.y.option(opt.data.key, opt.mapPositional());
		return this;
	};

	public modify = (cb: (y: Argv<any>) => Argv<any>) => {
		this.y = cb(this.y);
		return this;
	};

	get yargs() {
		return this.y;
	}
}
