

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