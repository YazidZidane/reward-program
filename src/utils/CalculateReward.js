const CalculateReward = (records) => {
  let totalRewards = 0,
    totalCost = 0;
  records.forEach((record) => {
    const currCost = Math.floor(record.cost);
    totalCost += record.cost;
    totalRewards += getReward(currCost);
  });
  totalCost = totalCost.toFixed(2);
  return { totalCost, totalRewards };
};

const getReward = (cost) => {
  if (cost < 50) return 0;
  else if (cost < 100) return cost - 50;
  else return (cost - 100) * 2 + 50;
};

export default CalculateReward;
