import { Controller, Get, Param , Query, Req, UseGuards} from '@nestjs/common';
import { CustomerService } from 'src/services/customer.service';
import { Customer as CustomerModel } from '.prisma/client';
import { UserService } from 'src/services/user.service';
import { stringify } from 'querystring';
import { AuthGuard } from '@nestjs/passport';


@Controller('customer')
export class CustomerController {
  constructor(private readonly custService: CustomerService,private readonly userService: UserService ) { }

  @Get()
  getAllCustomers(): Promise<CustomerModel[]> {
    return this.custService.costumers();
  }

  @Get('/bookings')
  @UseGuards(AuthGuard('jwt'))
  async getMyBookings(@Req() req : any ): Promise<CustomerModel> {

    console.log("Email : "+ req.user.email);

        // fetching customerID based on email
        const custId = await this.userService.custIdByUserEmail({ 
          where: {
              email: req.user.email,
          }
        })
  
    console.log(custId);

   return this.custService.myBookings({ customerId: Number(custId) }); 
    
  }  


}