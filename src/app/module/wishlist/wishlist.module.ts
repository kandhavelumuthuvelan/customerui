import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistBusiness } from '../../core/Business/WishlistBusiness';
import { WishlistService } from '../../core/services/wishlistService';
import { WishlistComponent } from './wishlist/wishlist.component';

@NgModule({
  imports: [CommonModule, WishlistRoutingModule],
  declarations: [WishlistComponent],
  providers: [WishlistBusiness, WishlistService]
})
export class WishlistModule {}
