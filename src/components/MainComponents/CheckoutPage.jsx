import React from "react";
import { useSelector } from "react-redux";
import AddressForm from "./AddressForm";
import PaymentMethod from "./PaymentMethod";
import OrderConfirmation from "./OrderConfirmation";

function CheckoutPage() {
  const { currentStep } = useSelector((state) => state.order);

  const steps = ['Address', 'Payment', 'Confirmation'];

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Stepper */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className={`flex items-center gap-2 ${
              currentStep > index + 1 ? 'text-green-500' :
              currentStep === index + 1 ? 'text-[var(--secondary)]' : 'text-gray-300'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                currentStep > index + 1 ? 'border-green-500 bg-green-50' :
                currentStep === index + 1 ? 'border-[var(--secondary)] bg-purple-50' :
                'border-gray-300'
              }`}>
                {currentStep > index + 1 ? '✓' : index + 1}
              </div>
              <span className="text-sm font-semibold hidden sm:block">{step}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 max-w-16 ${
                currentStep > index + 1 ? 'bg-green-400' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Steps */}
      {currentStep === 1 && <AddressForm />}
      {currentStep === 2 && <PaymentMethod />}
      {currentStep === 3 && <OrderConfirmation />}
    </div>
  );
}

export default CheckoutPage;