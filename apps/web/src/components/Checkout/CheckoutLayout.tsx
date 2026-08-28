import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearCart, selectCartItems } from '../../store/cartSlice';
import { useCreateOrderMutation } from '../../store/api'; // <-- api faylingiz nomiga moslang
import { ShippingAddressForm } from './ShippingAddressForm';
import { PaymentForm } from './PaymentForm';
import { CheckoutSummary } from './CheckoutSummary';
import { useNavigate } from 'react-router-dom';

export const CheckoutLayout = () => {
  const cartItems = useAppSelector(selectCartItems);
  const [createOrder, { isLoading }] = useCreateOrderMutation();
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      const items = cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      const user = JSON.parse(localStorage.getItem('user') || 'null');

      const shippingAddress = {
        address: user?.addresses?.[0]?.address,
        city: user?.addresses?.[0]?.city,
      };

      const paymentMethod = 'cash'; // hozircha statik

      await createOrder({ shippingAddress, paymentMethod, items }).unwrap();
      dispatch(clearCart());
      alert('Buyurtma muvaffaqiyatli joylandi');
      navigate('/')
    } catch (err) {
      console.error('Order yaratishda xatolik:', err);
      alert("Xatolik yuz berdi, qayta urinib ko'ring");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 flex flex-col gap-6">
          <ShippingAddressForm />
          <PaymentForm />
        </div>

        <div className="col-span-1">
          <CheckoutSummary
            onPlaceOrder={handlePlaceOrder}
            isSubmitting={isLoading}
          />
        </div>
      </div>
    </div>
  );
};