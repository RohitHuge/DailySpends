export const createFamily = async (req, res) => {
    const { user_id } = req.body;

    try {
        const query = `INSERT INTO families (created_by) VALUES ($1) RETURNING *`;
        
        const result = await req.pool.query(query, [user_id]);
    
        res.status(201).json(result.rows[0]);
        console.log(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });    
        console.log(error);
    }
}

export const checkForInvite = async (req, res) => {
    const { user_id } = req.body;

    try {
        const query = `SELECT * FROM invites WHERE user_id = $1`;

        const result = await req.pool.query(query, [user_id]);
        console.log(result.rows[0]);
        if (result.rows.length === 0) {
            res.status(201).json(null);
        } else {
            res.status(201).json(result.rows[0]);
        }

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.log(error);
    }

}

export const deleteInvite = async (req, res) => {
    const { user_id } = req.body;

    try {
        const query = `DELETE FROM invites WHERE user_id = $1`;
        const result = await req.pool.query(query, [user_id]);
        res.status(201).json({ message: 'Invite deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.log(error);
    }
}

export const addMember = async (req, res) => {
    const { phone, family_id } = req.body;

    const email = `${phone}@dailyspend.com`

    try {
        // First check if user exists with that phone number
        const userQuery = `SELECT appwrite_id FROM users WHERE email = $1`;
        const userResult = await req.pool.query(userQuery, [email]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user_id = userResult.rows[0].appwrite_id;

        // Check if user is already in a family
        const familyCheckQuery = `SELECT * FROM family_members WHERE user_id = $1`;
        const familyCheck = await req.pool.query(familyCheckQuery, [user_id]);

        if (familyCheck.rows.length > 0) {
            return res.status(400).json({ error: 'User already belongs to a family' });
        }

        // Create invite for the user
        const inviteQuery = `INSERT INTO invites (user_id, family_id) VALUES ($1, $2)`;
        await req.pool.query(inviteQuery, [user_id, family_id]);

        // Get user details to return
        const userDetailsQuery = `SELECT * FROM users WHERE appwrite_id = $1`;
        const userDetails = await req.pool.query(userDetailsQuery, [user_id]);

        res.status(201).json(userDetails.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}
