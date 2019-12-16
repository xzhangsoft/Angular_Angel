import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { DragContainerComponent } from './drag-container/drag-container.component';
import { LabelComponent } from './uiux/label/label.component';
import { DynamicWidgetsEngineComponent } from './engine/dynamic-widgets-engine/dynamic-widgets-engine.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { HttpClientModule } from '@angular/common/http';
import { DywidgetsDirective } from './dywidgets.directive';
import { ProgressBarComponent } from './uiux/progress-bar/progress-bar.component';
import { SpinnerComponent } from './uiux/spinner/spinner.component';
import { BrandingComponent } from './branding/branding.component';
import { PageComponent } from './page/page.component';
import { LiveComponent } from './live/live.component';
import { FactoryComponent } from './factory/factory.component';
import { FooterComponent } from './branding/footer/footer.component';
import { ModalComponent } from './uiux/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DragContainerComponent,
    LabelComponent,
    DynamicWidgetsEngineComponent,
    MainContainerComponent,
    DywidgetsDirective,
    WidgetsComponent,
    ProgressBarComponent,
    SpinnerComponent,
    BrandingComponent,
    PageComponent,
    LiveComponent,
    FactoryComponent,
    FooterComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [WidgetsComponent]
})
export class AppModule {}
