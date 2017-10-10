var mysql = require("mysql");
var Table = require('cli-table2');
var color = require('colors');
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: " ",
  database: "bamazon1"
});

connection.connect(function(err) {
  if (err) throw err;
console.log('Connected');

});


function stock() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    else {
        var table = new Table ({
            head: ['ID', 'Item', 'Department', 'Price', 'Quantity'],
            colWidths: [4, 20, 15, 8, 8]
        });
    }
      
    for (var i=0; i < res.length; i++) {
        table.push([res[i].id,
                    res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
    }
    console.log("\n")
    console.log(table.toString());
    console.log("\n")
    promptUserPurchase()            
                 });
}
  
  function promptUserPurchase() {



	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the ID of the item you would like to purchase.',
			
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you want?',
			
			filter: Number
		}
	]).then(function(input) {
		

		var item = input.item_id;
		var quantity = input.quantity;

		
		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {id: item}, function(err, data) {
			if (err) throw err;

		

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				stock();

			} else {
				var productData = data[0];

				
				if (quantity <= productData.stock_quantity) {
					console.log('Congratulations, the product you requested is in stock! Placing your order!');
					var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE id = ' + item;
					
					
					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
						console.log('Thanks for shopping with us!');
						console.log("\n----------------------------\n");

						connection.end();
					})
				} else {
					console.log('Sorry yourproduct is not in stock');
					console.log('Please change your order.');
					console.log("\n-------------------\n");

					stock();
				}
			}
		})
	})
}