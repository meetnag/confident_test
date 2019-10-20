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
          <h6 class="up-services">About Us</h6>
          <p class="foot-para">PharmBlock Drug Track, Trace & Monitor application addresses the counterfeit drugs through Blockchain Hyperledger. Our aim is to bring genuine drugs to the consumers, thus by saving their lives and improving their health.</p>
        </div>
        
        <!-- Service provided -->
        <div class="col-sm-4 col-md-4">
          <h6 class="up-services">Quick Links</h6>
          <ul class="links">
              <li><a href="assetTracking.html"><i class="fa fa-caret-right" aria-hidden="true"></i> &nbsp; Track</a></li>
              <li><a href="manufacturer.html"><i class="fa fa-caret-right" aria-hidden="true"></i> &nbsp; Manufacturer</a></li>
              <li><a href="distributor.html"><i class="fa fa-caret-right" aria-hidden="true"></i> &nbsp; Distributor</a></li>
              <li><a href="wholesaler.html"><i class="fa fa-caret-right" aria-hidden="true"></i> &nbsp; Wholesaler</a></li>
              <li class="last-border"><a href="retailer.html"><i class="fa fa-caret-right" aria-hidden="true"></i> &nbsp; Retailer</a></li>
          </ul>
        </div>
        
        <!-- Contact -->
        <div class="col-sm-4 col-md-4">
          <h6 class="up-services">Contact Us</h6>
            <ul class="personal-info">
              <li><i class="fa fa-map-marker" id="maper_id"></i>70-9 WOODHILLS DR GOSHEN, NY USA 10924 GOSHEN UNITED STATES</li>
              <li><i class="fa fa-envelope"></i>sales@Lambdablocks.com</li>
              <li><i class="fa fa-phone"></i>+91 99999 55555</li>
            </ul>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Rights -->
  <div class="rights">
    <div class="container">
      <div class="text_center">
        <p>Copyright © 2019 PharmBlock. All Rights Reserved.</p>
      </div>
    </div>
  </div>

</footer>
  `,
})
export class FooterComponent {
}
