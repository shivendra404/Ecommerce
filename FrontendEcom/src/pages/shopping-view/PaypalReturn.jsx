import { captureOrder } from '@/store/orderSlice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
//sb-apwip40008979@personal.example.com
// V,Md5[a#
function PaypalReturn() {

  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  console.log("hii1111111111111");

  useEffect(() => {
    console.log("hii2222222222222");

    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
      console.log("hii3333333333333");

      dispatch(captureOrder({
        paymentId,
        payerId,
        orderId
      })).then(data => {
        if (data?.payload?.success == true) {
          sessionStorage.removeItem("currentOrderId")
          window.location.href = "/payment-success"
        }


      })
    }
  }, [dispatch, paymentId, payerId])








  return (
    <div>
      <h1>Processing payment...please wait!</h1>
    </div>
  )
}

export default PaypalReturn
