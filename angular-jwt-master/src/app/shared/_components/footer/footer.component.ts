import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
  <footer>
    <!-- Footer Info -->
    <div class="footer-info">
      <div class="container">
        <div class="row"> 
          
          <!-- About -->
          <div class="col-sm-4 col-md-4"> 
            <h6 class="up-services">About</h6>
            <p class="foot-para">“LambdaBlocks – trailLedger” (LTL) is a Blockchain solution that builds trust and transparency in the distribution system to ensure genuineness of product to customer and to maintain product history.</p>
          </div>

          <!-- Service provided -->
          <div class="col-sm-4 col-md-4">
            <h6 class="up-services">Quick Links</h6>
            <ul class="links">
                <li><a href="assetTracking.html"><i class="fa fa-caret-right" aria-hidden="true"></i> &nbsp; Track</a></li>
                <li><a href="manufacturer.html"><i class="fa fa-caret-right" aria-hidden="true"></i> &nbsp; Manufacturer</a></li>
                <li><a href="distributor.html"><i class="fa fa-caret-right" aria-hidden="true"></i> &nbsp; Distributor</a></li>
                <li><a href="wholesaler.html"><i class="fa fa-caret-right" aria-hidden="true"></i> &nbsp; Wholesaler</a></li>
                <li><a href="retailer.html"><i class="fa fa-caret-right" aria-hidden="true"></i> &nbsp; Retailer</a></li>
                <li class="last-border"><a href="assets/img/trailLedgerHelpManual.chm"><i class="fa fa-caret-right" aria-hidden="true"></i> &nbsp; Help Files</a></li>
            </ul>
          </div>
          
          <!-- Contact -->
          <div class="col-sm-4 col-md-4">
            <h6 class="up-services">Support Details</h6>
              <ul class="personal-info">
                <li><a href="#" style="color: #ffffff;"><i class="fa fa-envelope"></i>Support</a></li>
                <li><i class="fa fa-phone"></i>+91 98860 41305</li>
                <li><a href="http://lambdablocks.com/" target="_blank" style="color: #ffffff;"><i class="fa fa-globe"></i>www.LambdaBlocks.com</a></li>
              </ul>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Rights -->
    <div class="rights">
      <div class="container">
        <div class="text_center">
          <p>Copyright © 2019 LambdaBlocks. All Rights Reserved.</p>
        </div>
      </div>
    </div>

  </footer>
  `,
})
export class FooterComponent {
}
