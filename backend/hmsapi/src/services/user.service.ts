import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { User, Prisma} from '.prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async costumers(): Promise<User[] | null> {
    return this.prisma.user.findMany({});
  }

  async userById(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: {
        customer: true
      }
    });

  }

  async custIdByUserId(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<Number> {
    const customerId = await this.prisma.user.findUnique({
      where: 
         userWhereUniqueInput
      ,select: {
        customer: {
            select :{
                customerId : true
            }
        }
      }
    });

    console.log(customerId);
    return customerId.customer.customerId;
  }

  async custIdByUserEmail(params: {
    where?: Prisma.UserWhereInput;
    }): Promise<Number> {
        const { where } = params;
    const customer = await this.prisma.user.findMany({
        where,
      select: {
        customer: {
            select :{
                customerId : true
            }
        }
      }
    });

    console.log(customer);
    return customer[0].customer.customerId;
  }
}