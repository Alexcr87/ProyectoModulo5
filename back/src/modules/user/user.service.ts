import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto} from "src/dto/createUserDto";
import { User } from "src/entities/user.entity";
import { In, Repository } from "typeorm";
import * as bcrypt from "bcrypt"
import { Role } from "src/entities/roles.entity";
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import { MailService } from "../mail/mail.service";
import { generateRandomPassword } from "src/helpers/password.helper"
import { OrganizationalStructure} from "src/entities/organizationalStructure.entity";
import { updateUserDto } from "src/dto/updateUserDto";
import { log } from "console";

// import { Account } from "src/entities/account.entity";


@Injectable()
export class UserService{
  private isCreatingUser = false;
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role) 
    private roleRepository: Repository<Role>,
    private readonly mailService: MailService, 
    @InjectRepository(OrganizationalStructure)
    private structureRepository: Repository<OrganizationalStructure>,
    // @InjectRepository(Account) private readonly accountRepository:Repository<Account>,
  ) {}


  async getUsers(parentId?: string): Promise<User[]> {
    try {
      if (parentId) {
        const parentUser = await this.userRepository.findOne({ where: { id: parentId } });
  
        if (!parentUser) {
          throw new NotFoundException(`Usuario con id ${parentId} no encontrado`);
        }
  // Obtén las relaciones donde este usuario es el padre
        const childRelations = await this.structureRepository.find({
          where: { parent: parentUser }, // Usando la relación
          relations: ['child'], // Carga la relación child
        });

        const childIds = childRelations.map(rel => rel.child.id); 
      
        if (childIds.length > 0) {
          return await this.userRepository.find({
            where: { id: In(childIds) },
            relations: ['roles'], 
          });
        } else {
          return []; 
        }
      }
      return await this.userRepository.find({relations: ['roles']});
    } catch (error) {
      throw new InternalServerErrorException('Error al recuperar usuarios');
    }
  }

  async assignPackageToUser(userId: string, packageId : number): Promise<User> {
   
    const user = await this.userRepository.findOne({ where: { id: userId } });

   
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // const selectedPackage = await this.accountRepository.findOne({where:{id:packageId}});
   
    // if (!user.accounts.some(account => account.id === selectedPackage.id)) {
    //   user.accounts.push(selectedPackage);
    // } else {
    //   throw new ConflictException('Package already assigned to user');
    // }
    // await this.userRepository.save(user);

    
    return user;
  }
  
  
  async deteleUserById(id: string):Promise <string> {
    try {
      const userToRemove = await this.userRepository.findOneBy({id})
    if(userToRemove){
      await this.userRepository.remove(userToRemove)
      return `Usuario con id: ${id} eliminado con éxito`
    }else{
      throw new NotFoundException(`Usuario con id: ${id} no enconrado`)
    }
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar un usuario')
    }
    
  }


  async updateUserById(id: string, createUserDto: updateUserDto): Promise<Omit<User, 'password'>> {
    try {
      console.log(createUserDto, "user");
      console.log(id, "id");
  
      // Buscar el usuario por su ID, incluyendo la relación 'roles'
      const userToUpdate = await this.userRepository.findOne({ where: { id }, relations: ['roles'] });
      if (!userToUpdate) {
        throw new NotFoundException(`User with id: ${id} not found`);
      }
  
      // Actualizar otros campos del usuario
      Object.assign(userToUpdate, createUserDto);
  
      // Si hay roles en el DTO, agregarlos a los roles actuales
      if (createUserDto.roles && createUserDto.roles.length > 0) {
        // Buscar los roles por sus IDs
        const rolesToAdd = await this.roleRepository.findByIds(createUserDto.roles);
        if (rolesToAdd.length === 0) {
          throw new NotFoundException('Roles not found');
        }
  
        // Agregar los roles nuevos a los existentes
        const existingRoles = userToUpdate.roles || [];
        userToUpdate.roles = [...existingRoles, ...rolesToAdd].filter(
          (role, index, self) => self.findIndex(r => r.id === role.id) === index
        ); // Asegurar que no haya duplicados

      }
  
      // Guardar el usuario actualizado
      const updatedUser = await this.userRepository.save(userToUpdate);
  
      // Omitir la contraseña en el retorno del usuario actualizado
      const { password, ...userToShow } = updatedUser;
      return {
        ...userToShow,
        roles:userToShow.roles
      };
  
    } catch (error) {

      console.error(`Error updating user with id ${id}:`, error);
      throw new InternalServerErrorException('Error updating user');

    }
  }
  
  
  

  async getUserById(id: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: { candidate: true, roles:true},
      })

      if (!user) {
        throw new NotFoundException(`Usuario con id: ${id} no se encuentra`)
      }
      const { password, ...userToShow } = user
      return userToShow
    } catch (error) {
      throw new InternalServerErrorException('Error al recuperar el usuario')
    }
  }
 

  async findUserByEmail(email:string):Promise<User>{
    return await this.userRepository.findOne({ where: { email } });
    } 
  

  async findUserByDni(dni:number):Promise<User>{ 
    const user = await this.userRepository.findOneBy({dni}); 
   if(!user){
    throw new NotFoundException(`usuario no encontrado`)
   }
   return user;
  }


  async createUser(
    createUserDto: CreateUserDto,
    parentId?: string,
): Promise<Omit<User, 'password'>> {
    if (this.isCreatingUser) {
        throw new ConflictException('La creación de usuarios ya está en curso.');
    }
    
    this.isCreatingUser = true;

    try {
        console.log('Iniciar la creación de usuarios en:', new Date());

        console.log('Comprobación de usuario existente con dni:', createUserDto.dni);
        const user = await this.userRepository.findOneBy({
            dni: createUserDto.dni,
        });
        if (user) {
            throw new UnauthorizedException(`Usuario con dni: ${createUserDto.dni} ya existe`);
        }
        
        console.log('Comprobación del usuario existente con correo electrónico:', createUserDto.email);
        const userByEmail = await this.userRepository.findOneBy({
            email: createUserDto.email,
        });
        if (userByEmail) {
            throw new UnauthorizedException(`Usuario con email: ${createUserDto.email} ya existe`);
        }

        // Generación de contraseña y encriptación
        const passwordGenerated = !createUserDto.password;
        const password = createUserDto.password || generateRandomPassword();
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Contraseña generada y hasheada.');

        // Roles y cuentas por defecto
        const defaultRole = await this.roleRepository.findOne({ where: { id: 3 } });
        if (!defaultRole) {
            throw new BadRequestException('No se encontró el rol predeterminado');
        }

        let userRoles: Role[] = [defaultRole];
        if (createUserDto.roles && createUserDto.roles.length > 0) {
            userRoles = await this.roleRepository.findBy({
                id: In(createUserDto.roles),
            });
            if (userRoles.length !== createUserDto.roles.length) {
                throw new BadRequestException('Algunos roles no encontrados');
            }
        }

        // console.log('Fetching default account.');
        // const withoutAccount = await this.accountRepository.findOne({
        //     where: { id: 0 },
        // });
        // if (!withoutAccount) {
        //     throw new BadRequestException('Default account not found');
        // }

        let newUser = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
            roles: userRoles,
            // accounts: [withoutAccount],
            isFirstLogin: !passwordGenerated ? false : undefined,
        });

        console.log('Guardar un nuevo usuario en la base de datos.');
        await this.userRepository.save(newUser);
        console.log('El usuario se ha guardado correctamente.');

        // Enviar el correo de bienvenida
        console.log('Enviando un correo electrónico de bienvenida a:', newUser.email);
        await this.mailService.sendWelcomeEmail(newUser.email, newUser.name, password);
        console.log('Correo electrónico de bienvenida enviado.');

        // Manejo de la relación con parentId
        if (parentId) {
            console.log('Manejo de la relación parentId con id:', parentId);
            const parentUser = await this.userRepository.findOneBy({ id: parentId });
            if (!parentUser) {
                throw new BadRequestException(`Usuario principal con id: ${parentId} no encontrado`);
            }
            const existingRelation = await this.structureRepository.findOne({
                where: { child: { id: newUser.id } },
            });
            if (existingRelation) {
                throw new BadRequestException(`Usuario con id: ${newUser.id} ya está relacionada con otro padre`);
            }
            const structureRelation = this.structureRepository.create({
                parent: parentUser,
                child: newUser,
            });
            await this.structureRepository.save(structureRelation);
            console.log('Relación de estructura guardada con éxito.');
        }

        const { password: excludedPassword, ...result } = newUser;
        return result;
    } catch (error) {
        console.error('Error durante la creación del usuario:', error);
        throw error; // O manejarlo según tus necesidades
    } finally {
        this.isCreatingUser = false; // Reset flag after processing.
    }
}

  async readExcelFile(filePath: string): Promise<CreateUserDto[]> {
    const data = fs.readFileSync(filePath);
    const workbook = XLSX.read(data, { type: 'buffer' });
    const sheetNames = workbook.SheetNames;
    const users: CreateUserDto[] = [];
  
    sheetNames.forEach(sheetName => {
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<CreateUserDto>(worksheet);
      users.push(...jsonData);
    });
  
    return users;
  }
  async importUsers(
    filePath: string, 
    parentId: string
  ): Promise<{ addedUsers: string[], errors: string[] }> {
    if (!filePath) {
      throw new BadRequestException('Archivo no seleccionado');
    }
  
    const users = await this.readExcelFile(filePath);
    const addedUsers: string[] = [];
    const errors: string[] = [];
  
    for (const user of users) {
      const missingFields = this.validateUserFields(user);
      if (missingFields.length > 0) {
        errors.push(`Error en la carga de datos de usuario ${user.email} (Nombre: ${user.name || 'N/A'}, DNI: ${user.dni || 'N/A'}): Faltan los siguientes campos: ${missingFields.join(', ')}, register manually`);
        continue;
      }
  
      const existingUser = await this.findUserByEmailxlsx(user.email);
      if (!existingUser) {
        try {
          await this.createUser(user, parentId);
          addedUsers.push(user.email);
        } catch (err) {
          errors.push(`Error en la creación de usuarios ${user.email}: ${err.message}`);
        }
      } else {
        errors.push(`El usuario ${user.email} (Nombre: ${user.name || 'N/A'}, DNI: ${user.dni || 'N/A'}) ya existe.`);
      }
    }
  
    return {
      addedUsers,
      errors  
    };
  }
  private validateUserFields(user: CreateUserDto): string[] {
    const missingFields = [];
  
    if (!user.name) missingFields.push('nombre');
    if (!user.dni) missingFields.push('dni');
    if (!user.email) missingFields.push('correo');
  
    return missingFields;
  }
  

  async findUserByEmailxlsx(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }


}