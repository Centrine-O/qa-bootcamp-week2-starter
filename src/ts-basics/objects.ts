let employee: {
  readonly id: number;
  name?: string;
  retire: (date: Date) => void;
} = {
  id: 1,
  retire: (date: Date) => console.log(date.getFullYear()),
};

employee.name = 'Ert';
console.log(employee.name);
employee.retire(new Date(2050, 0, 1));
