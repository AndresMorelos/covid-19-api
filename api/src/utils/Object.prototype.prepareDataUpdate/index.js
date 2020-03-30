/**
 * @type { Function }
 * @returns { String } Column = Value
 * 
 */
if (!Object.prototype.prepareDataUpdate) {
    Object.prototype.prepareDataUpdate = function () {
        const $this = this
        const columns = Object.keys($this)
        const values = columns.map(column => {
            let value = "NULL"

            switch (typeof ($this[column])) {
                case 'boolean':
                    value = $this[column]
                    break;
                case 'number':
                    value = $this[column]
                    break;
                case 'string':
                    value = $this[column] === "" ? "NULL" : `"${$this[column].replace(`\\`, ``)}"`
                    break;
                case 'object':
                    value = $this[column] === null ? "NULL" : $this[column];
                    break;
                default:
                    value = "NULL";
                    break;
            }

            return `${column}=${value}`
        })

        return values.join(', ')
    }
}