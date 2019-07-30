import { TagUpdaterService } from './core/services/tag-updater.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: '../app/module/index/index.module#IndexModule'
  },
  {
    path: 'profile',
    loadChildren: '../app/module/customer/customer.module#CustomerModule'
  },
  {
    path: 'wishlist',
    loadChildren: '../app/module/wishlist/wishlist.module#WishlistModule'
  },
  {
    path: 'sector/:key',
    loadChildren:
      '../app/module/filter-sector/filter-sector.module#FilterSectorModule'
  },
  {
    path: 'contact',
    loadChildren: '../app/module/contact/contact.module#ContactModule'
  },
  // {
  //   path: 'wishlist',
  //   loadChildren: '../app/module/wishlist/wishlist.module#WishlistModule'
  // },
  {
    path: 'cart',
    loadChildren: '../app/module/cart/cart.module#CartModule'
  },
  {
    path: 'checkout',
    loadChildren: '../app/module/checkout/checkout.module#CheckoutModule'
  },
  {
    path: 'product-detail/:name/:id',
    loadChildren:
      '../app/module/product-detail/product-detail.module#ProductDetailModule'
  },
  {
    path: 'chat',
    loadChildren:
      '../app/module/chat-box/chat-box.module#ChatBoxModule'
  },
  {
    path: 'chat/:id',
    loadChildren:
      '../app/module/chat-box/chat-box.module#ChatBoxModule'
  },
  {
    path: 'product-filter/:source/:key',
    loadChildren:
      '../app/module/product-filter/product-filter/product-filter.module#ProductFilterModule'
  },
  {
    path: 'seller-filter/:key',
    loadChildren:
      '../app/module/seller-filter/seller-filter.module#SellerFilterModule'
  },
  {
    path: 'order/:status',
    loadChildren:
      '../app/module/order/order.module#OrderModule'
  },
  {
    path: 'order',
    loadChildren:
      '../app/module/order/order.module#OrderModule'
  },

  {
    path: 'blogs',
    loadChildren:
      '../app/module/blogs/blogs.module#BlogsModule'
  },

  {
    path: 'career-detail/:id',
    loadChildren:
      '../app/module/career-detail/career-detail.module#CareerDetailModule'
  },

  {
    path: 'career',
    loadChildren:
      '../app/module/careers/careers.module#CareersModule'
  },

  {
    path: 'blog-detail/:id',
    loadChildren:
      '../app/module/blog-detail/blog-detail.module#BlogDetailModule'
  },

  {
    path: 'procurement',
    loadChildren:
      '../app/module/procurement/procurement.module#ProcurementModule'
  },
  {
    path: 'engineering',
    loadChildren:
      '../app/module/engineering/engineering.module#EngineeringModule'
  },
  {
    path: 'construction',
    loadChildren:
      '../app/module/construction/construction.module#ConstructionModule'
  },
  {
    path: 'rental',
    loadChildren:
      '../app/module/rental/rental.module#RentalModule'
  },
  {
    path: 'mup',
    loadChildren:
      '../app/module/mup/mup.module#MupModule'
  },
  {
    path: 'terms',
    loadChildren:
      '../app/module/terms/terms.module#TermsModule'
  },
  {
    path: 'cancellation',
    loadChildren:
      '../app/module/cancellation/cancellation.module#CancellationModule'
  },
  {
    path: 'privacy',
    loadChildren:
      '../app/module/privacy/privacy.module#PrivacyModule'
  },
  {
    path: 'return',
    loadChildren:
      '../app/module/return/return.module#ReturnModule'
  },
  {
    path: 'refund',
    loadChildren:
      '../app/module/refund/refund.module#RefundModule'
  },
  {
    path: 'payment',
    loadChildren:
      '../app/module/payment/payment.module#PaymentModule'
  },
  {
    path: 'about',
    loadChildren:
      '../app/module/about/about.module#AboutModule'
  },
  {
    path: 'instant',
    loadChildren:
      '../app/module/instant/instant.module#InstantModule'
  },
  {
    path: 'invoice/:id',
    loadChildren:
      '../app/module/invoice/invoice.module#InvoiceModule'
  },
  {
    path: 'reset/:id',
    loadChildren:
      '../app/module/reset-password/reset-password.module#ResetPasswordModule'
  },
  {
    path: 'forgot',
    loadChildren:
      '../app/module/forgot/forgot.module#ForgotModule'
  },
  {
    path: 'not-found',
    loadChildren:
      '../app/module/not-found/not-found.module#NotFoundModule'
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'not-found'
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
