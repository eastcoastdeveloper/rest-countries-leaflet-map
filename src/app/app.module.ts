import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FilterlistPipe } from './filter.pipe';

@NgModule({
  imports: [BrowserModule, HttpClientModule, FormsModule, LeafletModule],
  declarations: [AppComponent, FilterlistPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
