import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { User, Prisma } from '.prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async costumers(): Promise<User[] | null> {
    return this.prisma.user.findMany({});
  }

  async userById(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: {
        customer: true,
      },
    });
  }

  async custIdByUserId(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<number> {
    const customerId = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: {
        customer: {
          select: {
            customerId: true,
          },
        },
      },
    });

    console.log(customerId);
    return customerId.customer.customerId;
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async custIdByUserEmail(params: { where?: Prisma.UserWhereInput }): Promise<number> {
    const { where } = params;
    const customer = await this.prisma.user.findMany({
      where,
      select: {
        customer: {
          select: {
            customerId: true,
          },
        },
      },
    });

    console.log(customer);
    return customer[0].customer.customerId;
  }

  async userByEmail(params: { where?: Prisma.UserWhereInput }): Promise<User> {
    const { where } = params;
    const user = await this.prisma.user.findMany({
      where,
    });

    console.log(user);
    return user[0];
  }

  async fetchUserRole(params: { where?: Prisma.UserWhereInput }): Promise<string> {
    const { where } = params;
    const user = await this.prisma.user.findMany({
      where,
      include: {
        customer: true,
        employee: true,
      },
    });

    console.log(user[0]);

    if (user[0].customer == null && user[0].employee == null) {
      return 'No Roles Assigned';
    } else if (user[0].customer == null) {
      return 'Admin';
    } else {
      return 'User';
    }
  }
}
