import { AlertCard } from "./AlertCard";

export function ActiveAlertsList() {
  const alerts = [
    {
      id: "1",
      type: "out" as const,
      severity: "critical" as const,
      product: "Organic Whole Milk",
      message: "Out of stock on Shelf A3",
      timestamp: "5 min ago",
      details: {
        shelf: "A3",
        price: "$5.99",
        currentStock: 0,
        trend: "-100%"
      }
    },
    {
      id: "2",
      type: "out" as const,
      severity: "critical" as const,
      product: "Fresh Blueberries",
      message: "Out of stock on Shelf C2",
      timestamp: "12 min ago",
      details: {
        shelf: "C2",
        price: "$4.49",
        currentStock: 0,
        trend: "-100%"
      }
    },
    {
      id: "3",
      type: "low" as const,
      severity: "warning" as const,
      product: "Greek Yogurt 32oz",
      message: "Only 3 units left",
      timestamp: "28 min ago",
      details: {
        shelf: "A4",
        price: "$6.99",
        currentStock: 3,
        trend: "-40%"
      }
    },
    {
      id: "4",
      type: "low" as const,
      severity: "warning" as const,
      product: "Grass-Fed Butter",
      message: "Only 2 units left",
      timestamp: "45 min ago",
      details: {
        shelf: "A5",
        price: "$7.99",
        currentStock: 2,
        trend: "-60%"
      }
    },
    {
      id: "5",
      type: "low" as const,
      severity: "warning" as const,
      product: "Cage-Free Eggs",
      message: "Only 5 units left",
      timestamp: "1 hr ago",
      details: {
        shelf: "A6",
        price: "$4.99",
        currentStock: 5,
        trend: "-30%"
      }
    }
  ];

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <AlertCard key={alert.id} alert={alert} />
      ))}
    </div>
  );
}
