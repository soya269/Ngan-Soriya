import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ProductComponent } from '../components/product/product.component';
import { ContactComponent } from '../components/contact/contact.component';
import { ServiceComponent } from '../components/service/service.component';
import { PricingComponent } from '../components/pricing/pricing.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'product',
        pathMatch: 'full',
    },
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'product',
                component: ProductComponent
            },
            {
                path: 'service',
                component: ServiceComponent
            },
            {
                path: 'pricing',
                component: PricingComponent
            },
            {
                path: 'contact',
                component: ContactComponent
            }
        ]
    },
];
