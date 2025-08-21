export const getPaymentUrl = ({
  amount,
  name,
  upiId,
}: {
  amount: number;
  name: string;
  upiId: string;
}) => {
  return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    name
  )}&am=${amount}&cu=INR`;
};
