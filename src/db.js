import Dexie from 'dexie';

export const db = new Dexie('ExpenseTrackerDb');
db.version(7).stores({
  category: '++id,category,category_description', // Primary key and indexed props
  income: '++id,category,amount,date,description,other_expense_detail,user_id', // Primary key and indexed props
  expense: '++id,category,amount,date,description,other_expense_detail,user_id', // Primary key and indexed props
  goal: '++id,goal,amount,goalDescription,startDate', // Primary key and indexed props
  incomeGame: '++id,category,amount,date,description,other_expense_detail,user_id', // Primary key and indexed props
  expenseGame: '++id,category,amount,date,description,other_expense_detail,user_id', // Primary key and indexed props
});
