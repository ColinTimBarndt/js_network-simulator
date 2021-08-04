// MAC address

export type MacBytes = [number, number, number, number, number, number];

export class MacAddr {
	public static readonly BROADCAST = Object.freeze(
		new MacAddr(<MacBytes> new Array(6).fill(255))
	);

	public readonly bytes: Readonly<MacBytes>;

	public constructor(
		bytes: MacBytes,
	) {
		this.bytes = <Readonly<MacBytes>>Object.freeze(bytes);
	}

	public static random(): MacAddr {
		let bytes: MacBytes = [0, 0, 0, 0, 0, 0];
		let i = 0;
		for(; i<6; i++) {
			bytes[i] = Math.floor(Math.random() * 256);
		}
		return new MacAddr(bytes);
	}

	public equals(other: MacAddr): boolean {
		let i = 0;
		let eq = true;
		for(; i < 6; i++) {
			eq &&= this.bytes[i] === other.bytes[i];
		}
		return eq;
	}

	/** @override */
	public toString(): string {
		let str = (this.bytes[0] < 16 ? "0" : "") + this.bytes[0].toString(16);
		let i = 1;
		for (; i < 6; i++) {
			str += (this.bytes[i] < 16 ? ":0" : ":") + this.bytes[i].toString(16);
		}
		return str;
	}
}

// IP address

export abstract class IpAddress {
	public abstract equals(other: IpAddress): boolean;
}

// IPv4 address

export class IpV4ParseError extends Error {
	constructor(public input: string) {
		super("Invalid IPv4 address: " + input);
	}
}

export type IpV4Bytes = [number, number, number, number];

const ipV4Regex = new RegExp(
	"^"
	+ new Array(4)
		// Matches 0-255
		.fill("(2(?:5[0-5]|[0-4]\\d{1,2}|\\d)|1\\d{1,2}|\\d)")
		.join("\\.")
	+ "$"
);

export class IpAddressV4 extends IpAddress {
	public static readonly LOCALHOST: IpAddressV4 = Object.freeze(
		new IpAddressV4(0x7F000001)
	);

	public readonly data: number;
	
	public constructor(data: number) {
		super();
		this.data = Math.floor(data);
	}

	public static fromBytes(bytes: IpV4Bytes): IpAddressV4 {
		return new IpAddressV4(
			+ bytes[0] << 24
			| bytes[1] << 16
			| bytes[2] << 8
			| bytes[3]
		)
	}

	public static fromString(str: string): IpAddressV4 {
		let match = ipV4Regex.exec(str);
		if (match === null) throw new IpV4ParseError(str);
		return IpAddressV4.fromBytes(<IpV4Bytes>match.slice(1).map(parseInt))
	}
	
	public equals(other: IpAddress): boolean {
		if (other instanceof IpAddressV4) {
			return this.data === other.data;
		} else return false;
	}

	/** @override */
	public toString(): string {
		return [
			this.data >> 24,
			(this.data >> 16) & 255,
			(this.data >> 8) & 255,
			this.data & 255
		].join(".");
	}
}

// TODO: IPv4