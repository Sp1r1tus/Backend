import express = require('express');
import sql = require('mssql');

const router = express.Router();
const config = {
    user: 'Tools_User',
    password: '*******',
    database: 'Tools_DB',
    server: 'xxx.xxx.xxx.xxx'
};
const sql = require('mssql');

function GetData(callback) {
    var connection = new sql.ConnectionPool(config, function (err) {
        var request = new sql.Request(connection);
        //check for errors by inspecting the err parameter
        request.query("SELECT * FROM TEST_API", function (err, recordset) {
            callback(recordset);
        });
    });
}

router.get('/', (req: express.Request, res: express.Response, next) => {
    GetData(function (recordset) {
        res.status(200).json({
            data: recordset,
            message: 'Handling GET request to /DevTest'
        })
    });
});

router.post('/', (req: express.Request, res: express.Response, next) => {
    var connection = new sql.ConnectionPool(config, function (err) {
        var request = new sql.Request(connection);
        var transaction = new sql.Transaction(connection);
        transaction.begin().then(function () {
            var request = new sql.Request(transaction);
            request.input("Parameter1", req.body.ProductID)
            request.input("Parameter2", req.body.Product_Descr)
            request.execute("TEST_API").then(function () {
                transaction.commit().then(function (recordSet) {
                    connection.close();
                    res.status(201).json({
                        message: 'Handling POST request to /DevTest'
                    });
                })
            });
        });
    });
});

function GetSpezifiedData(id, callback) {
    var connection = new sql.ConnectionPool(config, function (err) {
        var request = new sql.Request(connection);
        request.query("SELECT * FROM TEST_API WHERE ID = " + id, function (err, recordset) {
            callback(recordset);
        });
    });
}

router.get('/:Id', (req, res, next) => {
    const id = req.params.productId;
    GetSpezifiedData(id, function (recordset) {
        res.status(200).json({
            data: recordset,
            message: 'You discovered the Special ID'
        })
    });
});

function DeleteData(id, callback) {
    var connection = new sql.ConnectionPool(config, function (err) {
        var request = new sql.Request(connection);
        request.query("Delete TEST_API WHERE ID = " + id, function (err, recordset) {
            callback(recordset);
        });
    });
}

router.get('/:deleteID', (req, res, next) => {
    const id = req.params.Id;
    DeleteData(id, function (recordset) {
        res.status(200).json({
            data: recordset,
            message: 'You discovered the Special ID'
        })
    });

});

router.patch('/:Id', (req, res, next) => {
    res.status(200).json({
        message: 'Update product!'
    })
});

router.delete('/:Id', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product!'
    })
});

module.exports = router;