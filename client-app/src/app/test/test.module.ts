import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';

// Form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TestComponent],
  imports: [CommonModule, TestRoutingModule, ReactiveFormsModule, FormsModule],
})
export class TestModule {}
