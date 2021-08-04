export default class EthAdapter {
    constructor(to = null) {
        this.to = to;
    }
    get connected() {
        return this.to !== null;
    }
}
//# sourceMappingURL=eth_adapter.js.map