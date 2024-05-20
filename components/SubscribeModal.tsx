"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import { Price, SubscribeModalProps } from "@/types";
import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import { postData } from "@/libs/helper";
import { getStripe } from "@/libs/stripeClient";
import useSubscribeModal from "@/hooks/useSubscribeModal";

const SubscribeModal: React.FC<SubscribeModalProps> = ({ products }) => {
  const [isPriceIdLoading, setIsPriceIdLoading] = useState<string>();
  
  const subscribeModal = useSubscribeModal();
  const { user, isLoading, subscription } = useUser();

  const handleOnChange = (open: boolean) => {
    if(!open) {
        subscribeModal.onClose();
    }
  }

  let content = <div className="text-center">No products available</div>;

  const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: price.currency,
      minimumFractionDigits: 0,
    }).format((price?.unit_amount || 0) / 100);

    return priceString;
  };

  const handleCheckout = async (price: Price) => {
    setIsPriceIdLoading(price?.id);

    if (!user) {
      setIsPriceIdLoading(undefined);
      return toast.error("You must be logged in to subscribe");
    }

    if (subscription) {
      setIsPriceIdLoading(undefined);
      return toast.error("You already have a subscription");
    }

    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: {price},
      });
      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error: any) {
      toast.error((error as Error)?.message);
    } finally {
      setIsPriceIdLoading(undefined);
    }
  };

  if (products.length) {
    content = (
      <div className="text-center">
        {products.map((product) => {
          if (!product.prices?.length) {
            return <div key={product.id}>No price available</div>;
          }

          return product.prices.map((price) => (
            <Button
              key={price.id}
              onClick={() => handleCheckout(price)}
              disabled={isLoading || price.id === isPriceIdLoading}
              className="mb-4"
            >
              {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
            </Button>
          ));
        })}
      </div>
    );
  }

  if (subscription) {
    content = <div className="text-center">Already subscribed</div>;
  }

  return (
    <Modal
      title="Only for premium user"
      description="Listen to premium with spotify premium"
      isOpen = {subscribeModal.isOpen}
      onChange={handleOnChange}
    >
      {content}
    </Modal>
  );
};

export default SubscribeModal;
