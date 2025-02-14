import React, { useEffect, useState } from "react";

// Components
import Icon from "@/components/Icon";
import Tabs from "@/components/Tabs";
import DotsLoader from "@/components/DotsLoader";
import OrdersTable from "@/components/OrdersTable";

// Services
import ordersService from "@/api/services/ordersService";

// Images
import reloadIcon from "@/assets/images/icons/reload.svg";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateOrders } from "@/store/features/ordersSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const allOrders = useSelector((state) => state.orders.data);
  const [filteredOrders, setFilteredOrders] = useState(allOrders || []);

  const loadOrders = () => {
    setHasError(false);
    setIsLoading(true);

    ordersService
      .getOrders()
      .then((products) => {
        setFilteredOrders(products);
        dispatch(updateOrders(products));
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (allOrders?.length === 0) loadOrders();
    else setTimeout(() => setIsLoading(false), 300);
  }, []);

  return (
    <div className="container py-6 space-y-7">
      <h1>Buyurtmalar</h1>

      {/* Nav tabs */}
      <Tabs name="orders" />

      {/* Orders */}
      {!isLoading && !hasError && filteredOrders?.length >= 0 && (
        <div className="overflow-hidden rounded-xl">
          <OrdersTable orders={filteredOrders} />
        </div>
      )}

      {/* Loading animation */}
      {isLoading && !hasError && (
        <DotsLoader
          color="#0085FF"
          className="flex justify-center fixed top-1/2 inset-x-0 w-full"
        />
      )}

      {/* Reload button */}
      {hasError && !isLoading && (
        <div className="flex justify-center fixed top-[calc(50%-20px)] inset-x-0">
          <button
            title="Reload"
            aria-label="Reload"
            onClick={loadOrders}
            className="flex items-center justify-center size-10"
          >
            <Icon src={reloadIcon} alt="Reload icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;
