import { Component, OnInit } from '@angular/core';

import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut } from '../animations/app.animation'

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block'
  },
  animations: [
    flyInOut()
  ]
})
export class AboutusComponent implements OnInit {

  leaders: Leader[];

  constructor(private leaderservice: LeaderService) { }

  ngOnInit() {
    this.leaderservice.getLeaders()
      .subscribe(leaders => this.leaders = leaders);
  }

}
