import { useState, useEffect, useCallback } from 'react';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51P0ushRsNEKpqF1rwE3Z5A4ExGMbur7Ca9cGRRsfvMu0U1QPxIc0yttLGCiDgUOuqKxA1yB8wh5TlpJybmaLi9cL00rMQc5pE1')

const StripePaymentForm = () => {
  const [clientSecret, setClientSecret] = useState(null);

  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("/create-checkout-session", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  useEffect(() => {
    // Fetch client secret when component mounts
    fetchClientSecret().then(secret => setClientSecret(secret));
  }, [fetchClientSecret]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={options}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
};

export default StripePaymentForm;
