export const registrationdata = async (req, res) => {
  try {
    const { username, email, password, appwrite_id } = req.body;
    const query = 'INSERT INTO users (username, email, password_hash, appwrite_id) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [username, email, password, appwrite_id];
    
    const result = await req.pool.query(query, values);
    res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const addtransaction = async (req, res) => { 
    try {
      const { amount, category, payment_type, bank, appwrite_id } = req.body;
      console.log("Add Transaction Request Body:", req.body);
      
      // First check if user exists
      const userCheck = await req.pool.query(
        'SELECT * FROM users WHERE appwrite_id = $1',
        [appwrite_id]
      );

      if (userCheck.rows.length === 0) {
        return res.status(403).json({ error: 'User not found' });
      }
      
      const query = `
        INSERT INTO transactions 
        (user_id, amount, category, payment_type, bank)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
      
      const result = await req.pool.query(query, [
        appwrite_id,
        amount,
        category,
        payment_type,
        bank
      ]);
      
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
}

export const transactions = async (req, res) => {
    try {
      const result = await req.pool.query(
       ` SELECT 
        transactions.*, 
        users.username 
      FROM transactions
      LEFT JOIN users ON transactions.user_id = users.appwrite_id
      ORDER BY transactions.created_at DESC
      LIMIT 100`
      );
  
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ error: 'Failed to fetch transactions' });
    }
  };