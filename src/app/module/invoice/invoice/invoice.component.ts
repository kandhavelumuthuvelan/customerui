import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Params, ActivatedRoute } from '@angular/router';
import { InvoiceBussiness } from 'src/app/core/Business/invoiceBussiness';
import { InvoiceDetail } from 'src/app/core/model/InvoiceModel';
declare var $: any;
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  private id: string;
  public billingDetail: InvoiceDetail[] = [];
  constructor(
    private route: ActivatedRoute,
    private bussiness: InvoiceBussiness
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.bussiness.GetInvoiceDetailById(this.id).subscribe(x => {
        this.billingDetail = x;
      });
    });
  }

  public captureScreen() {
    const data = document.getElementById('invBoxDownload');
    data.style.display = data.style.display === 'none' ? '' : 'none';
    html2canvas(data).then(canvas => {
     data.style.display = data.style.display === 'none' ? '' : 'none';
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('invoice_' + this.billingDetail[0].invoiceNo + '.pdf'); // Generated PDF
    });
  }
}
