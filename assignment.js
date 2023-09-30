const carMarket =  require("./obj.js");


//1. Agency Operations:

function agency_byName_byId(str){
    carMarket.sellers.forEach((seller) => {
        if (str === seller.agencyId || str === seller.agencyName){
            console.log(seller)
        }
    })
}


// agency_byName_byId("CarMax")


function Retrieve_all_agencies_names(obj){
    obj.sellers.forEach(seller => console.log(seller.agencyName))
}

// Retrieve_all_agencies_names(carMarket)

function addCarToInventory(agencyId, newCar) {
    const agency = carMarket.sellers.find((seller) => seller.agencyId === agencyId);
  
    if (!agency) {
      console.log("Agency not found.");
      return;
    }
  
    if (Array.isArray(newCar.models) && newCar.models.length > 0) {
        agency.cars.push(newCar);
        console.log("Car added successfully");
      } else {
        console.log("Invalid new car format");
      }
  }

  const newCar = {
    brand: "new car",
    models: [
      {
        name: "Camry",
        year: 2022,
        price: 25000,
        carNumber: "XYZ123",
        ownerId: "Plyq5M5AZ"
      }
    ]
  };

//   const agencyIdToAddTo = "Plyq5M5AZ";
// addCarToInventory(agencyIdToAddTo, newCar);

// console.log("Updated carMarket:", carMarket.sellers.find((seller) => seller.agencyId === agencyIdToAddTo).cars);


function removeCarFromInventory(agencyId, carId) {
    const agency = carMarket.sellers.find((seller) => seller.agencyId === agencyId);

    if (!agency) {
        console.log('Agency not found.');
        return;
    }

    const carIndex = agency.cars.findIndex((car) => car.models.some((model) => model.carNumber === carId));

    if (carIndex === -1) {
        console.log('Car not found in the inventory.');
        return;
    }

    agency.cars.splice(carIndex, 1);
    console.log('Car removed successfully.');
}

// const agencyIdToRemoveFrom = 'Plyq5M5AZ';
// const carIdToRemove = 'AZJZ4';
// removeCarFromInventory(agencyIdToRemoveFrom, carIdToRemove);

// console.log('Updated carMarket:', carMarket.sellers.find((seller) => seller.agencyId === agencyIdToRemoveFrom).cars);



function change_cash(agencyId,cash){
    const agency = carMarket.sellers.find((seller) => seller.agencyId === agencyId);

    if (!agency) {
        console.log('Agency not found.');
        return;
    }

    agency.cash = cash
    console.log(agency.cash)
}

// const agencyIdToAddTo = "Plyq5M5AZ";
// change_cash(agencyIdToAddTo,1111111);

// console.log('Updated carMarket:', carMarket.sellers.find((seller) => seller.agencyId === agencyIdToAddTo));




carMarket.updateCarPrice = function(brand, newPrice){
    for (const seller of this.sellers) {
      for (const car of seller.cars) {
        if (car.brand.toLowerCase() === brand.toLowerCase()) {
          car.models.forEach((model) => {
            model.price = newPrice;
            console.log(car.models)
          });
          console.log(`Price for ${brand} updated to ${newPrice}`);
         
          return;
        }
      }
    }
    console.log(`Car with brand ${brand} not found.`);
  }


//   carMarket.updateCarPrice('Toyota', 30000);



carMarket.getTotalAgencyRevenue = function(agencyId) {
    const agency = this.sellers.find((seller) => seller.agencyId === agencyId);

    if (!agency) {
      console.log('Agency not found.');
      return 0;
    }

    let totalRevenue = 0;

    for (const car of agency.cars) {
      for (const model of car.models) {
        totalRevenue += model.price;
      }
    }

    console.log(`Total revenue for agency ${agencyId}: $${totalRevenue}`);
    return totalRevenue;
}


// carMarket.getTotalAgencyRevenue('Plyq5M5AZ');


carMarket.transferCarBetweenAgencies = function(carNumber, sourceAgencyId, targetAgencyId) {
    const sourceAgency = this.sellers.find((seller) => seller.agencyId === sourceAgencyId);
    const targetAgency = this.sellers.find((seller) => seller.agencyId === targetAgencyId);

    if (!sourceAgency || !targetAgency) {
      console.log(' agency not found.');
      return;
    }

    let transferredCar = null;

    for (let i = 0; i < sourceAgency.cars.length; i++) {
      const car = sourceAgency.cars[i];
      for (let j = 0; j < car.models.length; j++) {
        if (car.models[j].carNumber === carNumber) {
          transferredCar = car.models.splice(j, 1)[0];
          if (car.models.length === 0) {
            sourceAgency.cars.splice(i, 1);
          }
          break;
        }
      }
    }

    if (transferredCar) {
      if (!targetAgency.cars) {
        targetAgency.cars = [];
      }

      const targetCar = targetAgency.cars.find((car) => car.brand === transferredCar.brand);

      if (targetCar) {
        targetCar.models.push(transferredCar);
      } else {
        targetAgency.cars.push({
          brand: transferredCar.brand,
          models: [transferredCar]
        });
      }

      console.log(`Car  ${carNumber} transferred successfully from ${sourceAgencyId} to ${targetAgencyId}.`);
    } else {
      console.log(`Car  ${carNumber} not found in  agency .`);
    }
}


//  carMarket.transferCarBetweenAgencies('S6DL1', 'Plyq5M5AZ', '26_IPfHU1');




//2. Customer Operations:

function customer_byName_byId(str){
    carMarket.customers.forEach((customer) => {
        if (str === customer.id || str === customer.name){
            console.log(customer)
        }
    })
}

// customer_byName_byId('BGzHhjnE8')


function Retrieve_all_customers_names(obj){
    obj.customers.forEach((customer) => {console.log(customer.name)})
}

// Retrieve_all_customers_names(carMarket)



function change_cash(customerId,cash){
    const customer = carMarket.customers.find((customer) => customer.id === customerId);

    if (!customer) {
        console.log('customer not found.');
        return;
    }

    customer.cash = cash
    console.log(customer.cash)
}

// const customeri = "BGzHhjnE8";
//  change_cash(customeri,2222222);

// console.log('Updated carMarket:', carMarket.customers.find((customer) => customer.id === customeri));



carMarket.getCustomerTotalCarValue = function(customerId){
    const customer = carMarket.customers.find((customer) => customer.id === customerId);
    if (!customer) {
        console.log('customer not found.');
        return;
    }
    let total = 0
    customer.cars.forEach((car) => {
        total = total+ car.price
    })
    return total
}

// console.log(carMarket.getCustomerTotalCarValue('cnTobUDy6'))


//3. Car Operations:



function Retrieve_all_cars_available_for_purchase(){
    carMarket.sellers.forEach((seller) => {
        seller.cars.forEach((car) => {
            console.log(car)
        })
    })
}

// Retrieve_all_cars_available_for_purchase()


// Search for cars based on certain criteria. The search parameters should include the
// production year, price, and optionally, the brand of the car

function search(prod_year, price, brand=''){
    if (!carMarket.sellers || carMarket.sellers.length === 0) {
        console.log('No agencies available.');
        return null;
      }
    const matchingCars = [];
  
    carMarket.sellers.forEach((seller) => {
      seller.cars.forEach((car) => {
        if (car.models.some(model => model.year === prod_year && model.price == price && (brand === '' || car.brand.toLowerCase() === brand.toLowerCase()))) {
          matchingCars.push(car.brand,car.models.filter(model => model.year === prod_year && model.price == price ));
        }
      });
    });
    
    return matchingCars;
}

// console.log(search(2015,218000))


//Return the most expensive car available for sale (Method: getMostExpensiveCar )

carMarket.getMostExpensiveCar = function(){

    if (!carMarket.sellers || carMarket.sellers.length === 0) {
        console.log('No agencies available.');
        return null;
      }
      
    let expensiveCar = 0;
    let expCar = null;

     carMarket.sellers.forEach((seller) => {
         seller.cars.forEach((car) => {
            car.models.filter((model) => {
            if(model.price > expensiveCar){
                expensiveCar = model.price
                expCar = { agency: seller.agencyName, car, model };
            }
            
           })
          })
        });
        return expCar
};

//console.log(carMarket.getMostExpensiveCar())

//Return the cheapest car available for sale (Method: getCheapestCar )

carMarket.getCheapestCar= function() {
    if (!carMarket.sellers || carMarket.sellers.length === 0) {
        console.log('No agencies available.');
        return null;
      }
    
      let cheapestCar = null;
      let cheapestPrice = Number.MAX_VALUE;
    
      for (const seller of carMarket.sellers) {
        for (const car of seller.cars) {
          for (const model of car.models) {
            if (model.price < cheapestPrice) {
              cheapestPrice = model.price;
              cheapestCar = { agency: seller.agencyName, car, model };
            }
          }
        }
      }
    
      return cheapestCar;
    
  }
  //console.log('Cheapest car:', carMarket.getCheapestCar());

//Car Purchase Operations:

// Implement a sellCar function that sells a car to a specific customer. This function
// should:


  const TAX_RATE = 0.1;

  function sellCar(customerId, CarBrand, carName) {
    const carDetails = barndMatch(CarBrand, carName);

    if (!carDetails) {
        console.log('Car not found.');
        return null;
    }

    const [carBrand, carModel] = carDetails;

    const customer = carMarket.customers.find(customer => customer.id === customerId);
    if (!customer) {
        console.log('Customer not found.');
        return null;
    }


// Verify if the customer has enough cash to purchase the car.
    if (customer.cash < carModel.price) {
        console.log('Customer does not have enough money.');
        return null;
    }

    const newCar = {
        name: carModel.name,
        year: carModel.year,
        price: carModel.price,
        carNumber: carModel.carNumber,
        ownerId: customerId
    };


    // Update the cash and credit for both the agency and the customer accordingly.

    customer.cars.push(newCar);
    customer.cash -= carModel.price;

    const agency = carMarket.sellers.find(seller => seller.agencyId === carModel.ownerId);
    if (agency) {
        agency.cash += carModel.price;
        console.log(`car (${carBrand} ${carName}) sold to ${customer.name}.`);
       
        // Update the tax authority's records.
        updateTaxAuthorityRecords(carModel.price);
    } else {
        console.log('Agency not found for the car.');
    }
}

// Check the availability of the car at the agency.
  function barndMatch(CarBrand,carName){

    for (const seller of carMarket.sellers) {
      for (const car of seller.cars) {
        for (const model of car.models) {
          if(car.brand == CarBrand && model.name == carName){
            return [car.brand,model]
          }   
       }
      }
    }
    console.log('no car')
    return null
  }

  function updateTaxAuthorityRecords(carPrice) {
    carMarket.taxesAuthority.totalTaxesPaid += (carPrice * TAX_RATE);
    carMarket.taxesAuthority.sumOfAllTransactions += carPrice;
    carMarket.taxesAuthority.numberOfTransactions++;
}



//  sellCar('FQvNsEwLZ', 'toyota', 'Corolla');

 //console.log(barndMatch('toyota','Corolla'))

//Calculate and return the total revenue of the entire market (Method:getTotalMarketRevenue ).


carMarket.getTotalMarketRevenue = function(){ 
  let totalRevenue = 0;

    for (const agency of carMarket.sellers) {
        for (const car of agency.cars) {
            for (const model of car.models) {
                totalRevenue += model.price;
            }
        }
    }

    return totalRevenue;
}


// const totalRevenue = carMarket.getTotalMarketRevenue();
// console.log( totalRevenue);