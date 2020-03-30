if (!String.prototype.includesArray) {
    String.prototype.includesArray = function (patterns = []) {
        const $this = this
        let value = 0
        patterns.forEach(pattern => {
            value = value + $this.includes(pattern)
        })
        return (value === 1)
    };
};