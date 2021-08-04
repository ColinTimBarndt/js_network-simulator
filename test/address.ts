import { assert, expect } from "chai";
import { IpAddressV4, MacAddr } from "../src/address";

describe("MAC address", () => {
	it("Initialize a new random MAC address", () => {
		let addr = MacAddr.random();
		
		expect(addr.toString().length)
			.to
			.equal(17, "The MAC address length is equal to 17");
	});

	it("Initialize a specific MAC address", () => {
		let addr = new MacAddr([0xF0, 0x0D, 0xDE, 0xAD, 0xBE, 0xEF]);
		
		expect(addr.toString())
			.to
			.equal("f0:0d:de:ad:be:ef", "Correct string representation");
		
		assert(addr.equals(addr), "Equals itself");

		assert(!addr.equals(MacAddr.BROADCAST), "Differs from the breadcast MAC");
	});
});

describe("IPv4 address", () => {
	const validateLocalhost = (addr: IpAddressV4) => {
		expect(addr.toString())
			.to
			.equal("127.0.0.1", "Correct string representation");

		assert(addr.equals(addr), "Equals itself");
		assert(addr.equals(IpAddressV4.LOCALHOST), "Equals localhost");

		assert(!addr.equals(new IpAddressV4(0)), "Differs from other address");
	}

	it("Initialize an address from number", () => {
		let addr = new IpAddressV4(0x7F000001); // 127.0.0.1
		validateLocalhost(addr);
	});

	it("Initialize an address from bytes", () => {
		let addr = IpAddressV4.fromBytes([127, 0, 0, 1]);
		validateLocalhost(addr);
	});

	it("Initialize an address from string", () => {
		let addr = IpAddressV4.fromString("127.0.0.1");
		validateLocalhost(addr);
	});
})