import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

interface UserOptionalPassword {
  name: string;
  email: string;
  password?: string;
}

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user: UserOptionalPassword = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default usersRouter;
