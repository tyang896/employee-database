const Employees = require("./Employees");

class All extends Employees{
    constructor(data){
        super(data);
        this.data = data;
    }
    async showAll(){
        await this.data.query(`SELECT * FROM employee`, function (err, results) {
            console.table(results);
        })
    }
}

module.exports = All;