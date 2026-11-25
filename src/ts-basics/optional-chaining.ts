type Customer = {
  birthday?: Date;
};

function getCustomer(id: number): Customer | null {
  return id === 0 ? null : { birthday: new Date(1990, 5, 15) };
}

let customer = getCustomer(0);
console.log(customer?.birthday?.getFullYear());

customer = getCustomer(1);
console.log(customer?.birthday?.getFullYear());
