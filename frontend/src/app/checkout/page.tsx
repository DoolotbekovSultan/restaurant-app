import { CheckoutForm } from '@/components/checkout/checkout-form';
import { PageTransition } from '@/components/shared/page-transition';

export default function CheckoutPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="mb-10">
          <p className="text-sm font-medium text-gold uppercase tracking-wider mb-2">Оформление</p>
          <h1 className="text-4xl font-bold text-white">Оформление заказа</h1>
        </div>
        <CheckoutForm />
      </div>
    </PageTransition>
  );
}
