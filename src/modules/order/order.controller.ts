import { Body, Controller, Get, Headers, Post, Query } from "@nestjs/common";
import { CalculateCommissionDTO } from "./dto/calculate-commission.dto";
import { CreateCardDataOrderDto } from "./dto/create-order-card-datacode.dto";
import { CreatePackageMobileOrderDto } from "./dto/create-order-package.dto";
import { CreatePaymentDTO } from "./dto/create-payment.dto";
import { OrderDetailsDTO } from "./dto/order-details.dto";
import { VerifyOtpDTO } from "./dto/verify-otp.dto";
import { VoucherDTO } from "./dto/voucher.dto";
import { OrderService } from "./order.service";
import { OrderReportDTO, ReportSummaryDTO } from "./dto/report.dto";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post("/card-data/create")
  createCardData(
    @Body() createOrderDto: CreateCardDataOrderDto,
    @Headers() headers: Record<"token", string>,
  ) {
    return this.orderService.createCardData(createOrderDto, headers.token);
  }

  @Post("/packagemobile/create")
  createPackageMobile(
    @Body() createOrderDto: CreatePackageMobileOrderDto,
    @Headers() headers: Record<"token", string>,
  ) {
    return this.orderService.createPackagemobile(createOrderDto, headers.token);
  }

  @Post("/packagemobile/verify-otp")
  verifyOtp(@Body() verifyOtpData: VerifyOtpDTO) {
    return this.orderService.verifyOtp(verifyOtpData);
  }

  @Post("/voucher")
  applyVoucher(@Body() voucherData: VoucherDTO) {
    return this.orderService.applyVoucher(voucherData);
  }

  @Post("/card-data/calculate-commission")
  calculateComission(
    @Body() calculateComission: CalculateCommissionDTO,
    @Headers() headers: Record<"token", string>,
  ) {
    return this.orderService.calculationComission(
      calculateComission,
      headers.token,
    );
  }

  @Post("/payment")
  createPayment(
    @Body() createPayment: CreatePaymentDTO,
    @Headers() headers: Record<"token", string>,
  ) {
    return this.orderService.createPayment(createPayment, headers.token);
  }

  @Get("/details")
  getOrderDetails(
    @Query() orderDetailsDto: OrderDetailsDTO,
    @Headers() headers: Record<"token", string>,
  ) {
    return this.orderService.getOrderDetails(orderDetailsDto, headers.token);
  }

  @Get("/report")
  getReport(
    @Query() orderReport: OrderReportDTO,
    @Headers() headers: Record<"token", string>,
  ) {
    return this.orderService.getReport(orderReport, headers.token);
  }

  @Get("/report-summary")
  getReportSummary(
    @Query() orderReport: ReportSummaryDTO,
    @Headers() headers: Record<"token", string>,
  ) {
    return this.orderService.getReportSummary(orderReport, headers.token);
  }

  @Get("/agents")
  getListAgents(@Headers() headers: Record<"token", string>) {
    return this.orderService.getListAgents(headers.token);
  }

  @Get("/bds")
  getListBds(@Headers() headers: Record<"token", string>) {
    return this.orderService.getListBds(headers.token);
  }
}
