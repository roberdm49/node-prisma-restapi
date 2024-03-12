import bcrypt from 'bcrypt'
import { GlobalEnv } from '@/utils/constants'
import { IUsersRepository, IUsersService } from './users.interfaces'
import { UsersServiceConstructor, UsersServiceCreate } from './users.types'

export default class UsersService implements IUsersService {
  private readonly usersRepository: IUsersRepository

  constructor ({ usersRepository }: UsersServiceConstructor) {
    this.usersRepository = usersRepository
  }

  create: UsersServiceCreate = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, GlobalEnv.HASH_ROUNDS)
    return await this.usersRepository.create({
      ...userData,
      password: hashedPassword
    })
  }
}
