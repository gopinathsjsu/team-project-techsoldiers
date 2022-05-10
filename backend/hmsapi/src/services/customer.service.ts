import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Customer, Prisma} from '.prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}
  async costumers(): Promise<Customer[] | null> {
    return this.prisma.customer.findMany({});
  }

  async customerById(
    customerWhereUniqueInput: Prisma.CustomerWhereUniqueInput,
  ): Promise<Customer | null> {
    return this.prisma.customer.findUnique({
      where: customerWhereUniqueInput,
      include: { 
        user:true
      }
    });
  }

  async myBookings(
    customerWhereUniqueInput: Prisma.CustomerWhereUniqueInput,
  ): Promise<Customer | null> {
    return this.prisma.customer.findUnique({
      where: customerWhereUniqueInput,
      include: { 
        bookings:true
        
      }
    });
  }

  async createCustomer(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return this.prisma.customer.create({
        data,
    });
}

}