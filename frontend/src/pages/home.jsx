// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
const Home = () => {
// State for expense form
const [isQuickAddVisible, setIsQuickAddVisible] = useState(true);
const [paymentType, setPaymentType] = useState<'cash' | 'debit'>('cash');
const [amount, setAmount] = useState('');
const [selectedCategory, setSelectedCategory] = useState('');
const [selectedBank, setSelectedBank] = useState('');
// Categories with emojis
const categories = [
{ id: 'milk', emoji: '🥛', name: 'Milk' },
{ id: 'grocery', emoji: '🛒', name: 'Grocery' },
{ id: 'fastfood', emoji: '🍔', name: 'Fast Food' },
{ id: 'bread', emoji: '🍞', name: 'Bread' },
{ id: 'veggies', emoji: '🥦', name: 'Veggies' },
{ id: 'travel', emoji: '🚕', name: 'Travel' },
{ id: 'bills', emoji: '📝', name: 'Bills' },
{ id: 'health', emoji: '💊', name: 'Health' },
];
// Banks with emojis
const banks = [
{ id: 'sbi', emoji: '🏦', name: 'SBI' },
{ id: 'icici', emoji: '🏛️', name: 'ICICI' },
{ id: 'hdfc', emoji: '💳', name: 'HDFC' },
{ id: 'axis', emoji: '🏤', name: 'Axis' },
];
// Sample expense data
const expenses = [
{
id: 1,
date: 'June 7, 2025 • 10:30 AM',
amount: 120,
category: { id: 'milk', emoji: '🥛', name: 'Milk' },
paymentType: 'cash',
bank: null,
user: 'John'
},
{
id: 2,
date: 'June 6, 2025 • 2:15 PM',
amount: 450,
category: { id: 'grocery', emoji: '🛒', name: 'Grocery' },
paymentType: 'debit',
bank: { id: 'hdfc', emoji: '💳', name: 'HDFC' },
user: 'Sarah'
},
{
id: 3,
date: 'June 6, 2025 • 11:45 AM',
amount: 250,
category: { id: 'fastfood', emoji: '🍔', name: 'Fast Food' },
paymentType: 'cash',
bank: null,
user: 'Michael'
},
{
id: 4,
date: 'June 5, 2025 • 6:20 PM',
amount: 80,
category: { id: 'bread', emoji: '🍞', name: 'Bread' },
paymentType: 'cash',
bank: null,
user: 'Emily'
},
{
id: 5,
date: 'June 5, 2025 • 4:10 PM',
amount: 350,
category: { id: 'veggies', emoji: '🥦', name: 'Veggies' },
paymentType: 'debit',
bank: { id: 'sbi', emoji: '🏦', name: 'SBI' },
user: 'David'
},
{
id: 6,
date: 'June 4, 2025 • 9:30 AM',
amount: 500,
category: { id: 'travel', emoji: '🚕', name: 'Travel' },
paymentType: 'debit',
bank: { id: 'icici', emoji: '🏛️', name: 'ICICI' },
user: 'Jessica'
},
];
// Filter options
const filterOptions = ['All', 'Cash', 'Debit', 'Today', 'This Week'];
const [activeFilter, setActiveFilter] = useState('All');
// Handle form submission
const handleSubmit = (e) => {
e.preventDefault();
// Add expense logic would go here
setAmount('');
setSelectedCategory('');
setSelectedBank('');
};
return (
<div className="flex flex-col h-screen bg-gray-50 max-w-[400px] mx-auto relative">
{/* Quick Add Expense Panel */}
<div className="bg-white shadow-md z-10 sticky top-0 transition-all duration-300">
<div className="flex justify-between items-center px-4 py-3 border-b">
<h1 className="text-lg font-semibold text-gray-800">Family Expense Tracker</h1>
<button
onClick={() => setIsQuickAddVisible(!isQuickAddVisible)}
className="text-gray-600 cursor-pointer"
>
{isQuickAddVisible ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
</button>
</div>
{isQuickAddVisible && (
<form onSubmit={handleSubmit} className="px-4 py-3">
<div className="flex items-center mb-3">
<div className="flex bg-gray-100 rounded-lg p-1 mr-3">
<button
type="button"
className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer !rounded-button ${
paymentType === 'cash'
? 'bg-white shadow-sm text-blue-600'
: 'text-gray-600'
}`}
onClick={() => setPaymentType('cash')}
>
💵 Cash
</button>
<button
type="button"
className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer !rounded-button ${
paymentType === 'debit'
? 'bg-white shadow-sm text-blue-600'
: 'text-gray-600'
}`}
onClick={() => setPaymentType('debit')}
>
💳 Debit
</button>
</div>
<div className="flex-1 relative">
<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
<input
type="text"
value={amount}
onChange={(e) => setAmount(e.target.value)}
placeholder="Amount"
className="w-full pl-8 pr-3 py-2 border-none bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
/>
</div>
</div>
<div className="mb-3">
<div className="grid grid-cols-4 gap-2 mb-2">
{categories.map((category) => (
<button
key={category.id}
type="button"
className={`px-2 py-2 rounded-lg text-sm font-medium text-center cursor-pointer !rounded-button ${
selectedCategory === category.id
? 'bg-blue-100 text-blue-600 border border-blue-200'
: 'bg-gray-100 text-gray-600 border border-gray-200'
}`}
onClick={() => setSelectedCategory(category.id)}
>
<div className="flex flex-col items-center">
<span className="text-lg">{category.emoji}</span>
<span className="text-xs truncate w-full">{category.name}</span>
</div>
</button>
))}
</div>
<div className="relative">
<input
type="text"
placeholder="Other expense category"
className="w-full pl-8 pr-3 py-2 border-none bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
onChange={(e) => setSelectedCategory(e.target.value)}
/>
<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">📝</span>
</div>
</div>
{paymentType === 'debit' && (
<div className="mb-3 overflow-x-auto pb-1 -mx-1 px-1">
<div className="flex space-x-2 min-w-max">
{banks.map((bank) => (
<button
key={bank.id}
type="button"
className={`px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer !rounded-button ${
selectedBank === bank.id
? 'bg-blue-100 text-blue-600 border border-blue-200'
: 'bg-gray-100 text-gray-600 border border-gray-200'
}`}
onClick={() => setSelectedBank(bank.id)}
>
<span>{bank.emoji} {bank.name}</span>
</button>
))}
</div>
</div>
)}
<button
type="submit"
className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer !rounded-button"
>
➕ Add Expense
</button>
</form>
)}
</div>
{/* Expense Log */}
<div className="flex-1 overflow-y-auto pb-32">
{/* Filter options */}
<div className="px-4 py-3 sticky top-0 bg-gray-50 z-10 border-b">
<div className="flex overflow-x-auto space-x-2 pb-1 -mx-1 px-1">
{filterOptions.map((filter) => (
<button
key={filter}
className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer !rounded-button ${
activeFilter === filter
? 'bg-blue-100 text-blue-600 border border-blue-200'
: 'bg-white text-gray-600 border border-gray-200'
}`}
onClick={() => setActiveFilter(filter)}
>
{filter}
</button>
))}
</div>
</div>
{/* Expense list */}
<div className="divide-y divide-gray-100">
{expenses.map((expense) => (
<div key={expense.id} className="p-4 bg-white">
<div className="flex justify-between items-start mb-1">
<span className="text-xs text-gray-500">{expense.date}</span>
<span className="font-medium text-gray-900">₹{expense.amount}</span>
</div>
<div className="flex items-center justify-between">
<div className="flex items-center">
<span className="mr-2">
{expense.category.emoji}
</span>
<span className="text-sm text-gray-700">{expense.category.name}</span>
<span className="mx-2 text-gray-300">•</span>
<span className="text-sm text-gray-700">
{expense.paymentType === 'cash' ? '💵' : '💳'}
{expense.bank && ` ${expense.bank.name}`}
</span>
</div>
<span className="text-xs text-gray-500">👤 {expense.user}</span>
</div>
</div>
))}
</div>
</div>
{/* Spending Summary */}
<div className="fixed bottom-16 left-0 right-0 bg-white border-t border-b border-gray-200 px-4 py-2 shadow-sm max-w-[400px] mx-auto">
<div className="flex space-x-3">
<div className="flex-1 bg-blue-50 rounded-lg p-2 border border-blue-100">
<div className="flex justify-between items-center">
<span className="text-xs text-gray-500">💵 Cash Total (since May 22)</span>
<span className="font-medium text-blue-600">₹950</span>
</div>
</div>
<div className="flex-1 bg-green-50 rounded-lg p-2 border border-green-100">
<div className="flex justify-between items-center">
<span className="text-xs text-gray-500">💳 Debit Total (since May 25)</span>
<span className="font-medium text-green-600">₹1,300</span>
</div>
</div>
</div>
</div>
{/* Bottom Navigation */}
<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-[400px] mx-auto">
<div className="grid grid-cols-3 h-16">
<button className="flex flex-col items-center justify-center text-blue-600 cursor-pointer">
<i className="fas fa-home text-lg"></i>
<span className="text-xs mt-1">Home</span>
</button>
<button className="flex flex-col items-center justify-center text-gray-500 cursor-pointer">
<i className="fas fa-users text-lg"></i>
<span className="text-xs mt-1">Family</span>
</button>
<button className="flex flex-col items-center justify-center text-gray-400 opacity-60 cursor-not-allowed">
<i className="fas fa-chart-bar text-lg"></i>
<span className="text-xs mt-1">Analytics</span>
<span className="text-[10px] text-gray-400">Coming Soon</span>
</button>
</div>
</div>
</div>
);
};
export default Home;