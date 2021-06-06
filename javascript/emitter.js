class Emitter {
    constructor() {
        this.events = [];
    }

    emit = (key, ...args) => {
        const event = this.getEvent(key);
        if (event)
            event[1](...args);
    }

    on = (key, callback) => this.events = [...this.events, [key.toLowerCase(), callback]];

    getEvent = (key) => this.events.find(event => event[0] === key.toLowerCase());
}

export default Emitter;