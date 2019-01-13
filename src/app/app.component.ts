import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blank-prototype';

  ngOnInit() {
    
    $('#border').css('width', '0%').css('margin-left', '50%');
    setTimeout(() => {
      $('#border').animate({
        width: '100%',
        marginLeft: '0%'
      }, 800, 'swing');
    }, 500);

  }
}
