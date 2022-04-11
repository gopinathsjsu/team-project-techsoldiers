import { Controller, Get, Param , Query} from '@nestjs/common';
import { CustomerService } from 'src/services/customer.service';
import { Customer as CustomerModel } from '.prisma/client';

@Controller('customer')
export class CustomerController {
  constructor(private readonly custService: CustomerService) { }

  @Get()
  getAllCustomers(): Promise<CustomerModel[]> {
    return this.custService.costumers();
  }

  @Get('/:id')
  async getCustomerById(@Param('id') id: string): Promise<CustomerModel> {
    return this.custService.customerById({ customerId: Number(id) });
  }  

}