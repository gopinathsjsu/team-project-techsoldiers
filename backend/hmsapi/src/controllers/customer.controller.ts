import { Controller, Get, Param , Query} from '@nestjs/common';
import { CustomerService } from 'src/services/customer.service';
import { Customer as CustomerModel } from '.prisma/client';
import { UserService } from 'src/services/user.service';
import { stringify } from 'querystring';


@Controller('customer')
export class CustomerController {
  constructor(private readonly custService: CustomerService,private readonly userService: UserService ) { }

  @Get()
  getAllCustomers(): Promise<CustomerModel[]> {
    return this.custService.costumers();
  }

  @Get('/:id')
  async getCustomerById(@Param('id') id: string): Promise<CustomerModel> {
    return this.custService.customerById({ customerId: Number(id) });
  }  

  @Get('/bookings/:email')
  async getMyBookings(@Param('email') email: string): Promise<CustomerModel> {
  
    //const custId = await this.userService.custIdByUserId({id: Number(id)});
    const custId = await this.userService.custIdByUserEmail({ 
      where: {
         
        email: email,
      
       }
    
    })
    console.log(custId);
   return this.custService.myBookings({ customerId: Number(custId) });
    
  }  

}