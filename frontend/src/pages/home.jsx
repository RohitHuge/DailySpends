import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faHome, faUsers, faChartBar } from '@fortawesome/free-solid-svg-icons';
import authService from '../appwrite/auth';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../config'; 


const Home = () => {
  const navigate = useNavigate();
  // State for expense form
  const [isQuickAddVisible, setIsQuickAddVisible] = useState(true);
  const [paymentType, setPaymentType] = useState('cash');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [otherCategory, setOtherCategory] = useState('');
  const [summary, setSummary] = useState({
    cashTotal: 0,
    debitTotal: 0,
    lastCashLogDate: null,
    lastDebitLogDate: null,
  });


  // Categories with emojis
  const categories = [
    { id: 'milk', emoji: '🥛', name: 'Milk' },
    { id: 'grocery', emoji: '🛒', name: 'Grocery' },
    { id: 'petrol', emoji: '🚗', name: 'Petrol' },
    { id: 'bread', emoji: '🍞', name: 'Bread' },
    { id: 'veggies', emoji: '🥦', name: 'Veggies' },
    { id: 'travel', emoji: '🚕', name: 'Travel' },
    { id: 'phonepe', emoji: '📱', name: 'PhonePe' },
    { id: 'health', emoji: '💊', name: 'Health' },
  ];

  // Banks with emojis
  const banks = [
    { id: 'sbi', emoji: '🏦', name: 'SBI' },
    { id: 'icici', emoji: '🏛️', name: 'ICICI' },
    { id: 'hdfc', emoji: '💳', name: 'HDFC' },
    { id: 'axis', emoji: '🏤', name: 'Axis' },
  ];


  // Filter options
  const filterOptions = ['All', 'Cash', 'Debit', 'Today', 'This Week'];

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    
    if (!amount && !selectedCategory && !otherCategory) {
      alert('Please fill all required fields');
      return;
    }
  
    try {
      // Get current user
      const user = await authService.getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      // Create transaction payload
      const transaction = {
        amount: parseFloat(amount),
        category: paymentType === 'phonepe' ? otherCategory : selectedCategory,
        payment_type: paymentType,
        bank: paymentType !== 'cash' ? selectedBank : null,
        appwrite_id: user.$id // Add the appwrite_id from the current user
      };
  
      // Send to backend
      const response = await fetch(`${backendUrl}/addtransaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction)
      });
  
      if (!response.ok) throw new Error('Failed to add transaction');
  
      // Add new transaction to expenses UI
      setExpenses([ {
        id: response.id,
        date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
        amount: transaction.amount,
        category: {
          id: selectedCategory,
          name: selectedCategory,
          emoji: '📝'
        },
        paymentType: transaction.payment_type,
        bank: transaction.bank ? banks.find((b) => b.id === transaction.bank) : null,
        user: 'You' 
      }, ...expenses]);
      
      // Reset form
      setAmount('');
      setSelectedCategory('');
      setSelectedBank('');
  
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('Failed to add expense. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAnalytics = async () => {
    console.log('Analytics');
    await authService.logout();
    navigate('/');
  };

  // Fetch expenses from backend
  const fetchExpenses = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${backendUrl}/transactions`);
      const data = await res.json();
      const res2 = await fetch(`${backendUrl}/summarydata`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ family_id: '11111111-1111-1111-1111-111111111111' })
      });
      const data2 = await res2.json();
      // setSummary(data2);
      setSummary({
        cashTotal : data2.cashTotal,
        debitTotal : data2.debitTotal,
        lastCashLogDate: new Date(data2.lastCashLogDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
        lastDebitLogDate: new Date(data2.lastDebitLogDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
      });
  
      // Convert category and bank fields to match UI shape
      const transformed = data.map((txn) => ({
        id: txn.id,
        date: new Date(txn.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
        amount: txn.amount,
        category: categories.find((c) => c.id === txn.category) || { id: txn.category, emoji: '📝', name: txn.category },
        paymentType: txn.payment_type,
        bank: txn.bank ? banks.find((b) => b.id === txn.bank) : null,
        user: txn.username || 'You' // Replace with real name if available
      }));
  
      setExpenses(transformed);
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFamily = () => {
    navigate('/profile');
  }

const handleCategorySelect = (categoryId) => {
  if (categoryId === 'phonepe') {
    setPaymentType('phonepe');
    setSelectedCategory('');
  } else {
    setSelectedCategory(categoryId);
    setPaymentType('cash');
  }
 };
  

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (!user) {
          navigate('/');
        } else {
          await fetchExpenses(); // 🔁 Fetch on load
        }
      } catch (error) {
        console.error('Error checking user:', error);
        navigate('/');
      }
    };
  
    checkUser();
  }, []);

  if (isUpdating) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-50">
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
               <p className="text-gray-700 text-lg mt-4">Updating...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-[400px] mx-auto relative">
      {/* Quick Add Expense Panel */}
      <div className="bg-white shadow-md z-10 sticky top-0 transition-all duration-300">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h1 className="text-lg font-semibold text-gray-800">Daily Spend</h1>
          <button
            onClick={() => setIsQuickAddVisible(!isQuickAddVisible)}
            className="text-gray-600 cursor-pointer"
          >
            <FontAwesomeIcon icon={isQuickAddVisible ? faChevronUp : faChevronDown} />
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
                    onClick={() => handleCategorySelect(category.id)}
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
                  id="other-expense-category"
                  type="text"
                  placeholder="Other expense category"
                  className="w-full pl-8 pr-3 py-2 border-none bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  value={otherCategory}
                  onChange={(e) => setOtherCategory(e.target.value)}
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">📝</span>
              </div>
            </div>
            {(paymentType === 'debit' || paymentType === 'phonepe') && (
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
        {/* <div className="px-4 py-3 sticky top-0 bg-gray-50 z-10 border-b">
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
        </div> */}
        {/* Expense list */}
        <div className="divide-y divide-gray-100">
          {isLoading && (
            <div className="p-4 text-center text-gray-500">
              Loading expenses...
            </div>
          )}

{expenses.map((expense) => (
  <div key={expense.id} className="p-4 bg-white"> {/* Add key here */}
    <div className="flex justify-between items-start mb-1">
      <span className="text-xs text-gray-500">{expense.date}</span>
      <span className="font-medium text-gray-900">₹{expense.amount}</span>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <span className="mr-2">{expense.category.emoji}</span>
        <span className="text-sm text-gray-700">{expense.category.name}</span>
        <span className="mx-2 text-gray-300">•</span>
        <span className="text-sm text-gray-700">
          {expense.paymentType === 'cash' ? '💵' : 
           expense.paymentType === 'debit' ? '💳' : '📱'}
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
              <span className="text-xs text-gray-500">💵 Cash Total (since {summary.lastCashLogDate})</span>
              <span className="font-medium text-blue-600">₹{summary.cashTotal}</span>
            </div>
          </div>
          <div className="flex-1 bg-green-50 rounded-lg p-2 border border-green-100">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">💳 Debit Total (since {summary.lastDebitLogDate})</span>
              <span className="font-medium text-green-600">₹{summary.debitTotal}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-[400px] mx-auto">
        <div className="grid grid-cols-3 h-16">
          <button className="flex flex-col items-center justify-center text-blue-600 cursor-pointer">
            <FontAwesomeIcon icon={faHome} className="text-lg" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button onClick = {handleFamily}className="flex flex-col items-center justify-center text-gray-500 cursor-pointer">
            <FontAwesomeIcon icon={faUsers} className="text-lg" />
            <span className="text-xs mt-1">Family</span>
          </button>
          <button onClick={handleAnalytics} className="flex flex-col items-center justify-center text-gray-400 opacity-60 cursor-not-allowed">
            <FontAwesomeIcon icon={faChartBar} className="text-lg" />
            <span className="text-xs mt-1">Analytics</span>
            <span className="text-[10px] text-gray-400">Coming Soon</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;