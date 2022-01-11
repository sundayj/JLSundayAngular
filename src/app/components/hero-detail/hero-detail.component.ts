import { Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero-service/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.scss' ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero | null;

  public nameEdit: string = '';

  public inputDisabled = true;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {
    this.hero =  null;
  }

  ngOnInit(): void {
    if (!this.hero) {
      this.getHero();
    }
    this.nameEdit = this.hero ? this.hero.name : '';
  }

  getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

  enableEdit(name: string): void {
    this.inputDisabled = false;
    this.nameEdit = name;
  }
}
