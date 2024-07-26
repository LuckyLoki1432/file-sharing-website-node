const users = {};  // In-memory user storage, use a database for production

export const register = (req, res) => {
    const { username, password } = req.body;

    if (users[username]) {
        return res.status(400).send('User already exists');
    }

    users[username] = { username, password };
    res.send('Registration successful');
};

export const login = (req, res) => {
    const { username, password } = req.body;

    const user = users[username];
    if (!user || user.password !== password) {
        return res.status(400).send('Invalid credentials');
    }

    req.session.user = user;
    res.send('Login successful');
};

export const logout = (req, res) => {
    req.session.destroy();
    res.send('Logout successful');
};

export const currentUser = (req, res) => {
    const user = req.session.user;
    if (user) {
        res.json(user);
    } else {
        res.status(401).send('Not authenticated');
    }
};
